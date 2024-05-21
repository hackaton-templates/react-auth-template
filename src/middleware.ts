import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { CookieResponseHandler } from "./lib/cookie";
import authStorageService from "./services/auth-storage.service";
import userStorageService from "./services/user-storage.service";
import authService from "./services/auth.service";
import { type AuthResult } from "./types/auth.type";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!signup|_next/static|_next/image|favicon.ico).*)",
  ],
};

function signin(request: NextRequest, authResult: AuthResult | null) {
  if (!authResult) return NextResponse.next();
  return NextResponse.redirect(new URL("/", request.nextUrl));
}

function signout(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/signin", request.nextUrl));
  const handler = new CookieResponseHandler(response);
  authStorageService.remove({ cookieHandler: handler });
  userStorageService.remove({ cookieHandler: handler });
  return response;
}

async function refresh(
  request: NextRequest,
  authResult: AuthResult
): Promise<NextResponse> {
  let response: NextResponse;

  try {
    const authResultRefreshed = await authService.refresh(authResult);
    response = NextResponse.next();

    const handler = new CookieResponseHandler(response);
    authStorageService.set(authResultRefreshed, { cookieHandler: handler });
  } catch (e) {
    response = NextResponse.redirect(new URL("/signin", request.nextUrl));

    const handler = new CookieResponseHandler(response);
    authStorageService.remove({ cookieHandler: handler });
  }
  return Promise.resolve(response);
}

export async function middleware(request: NextRequest) {
  const authResult = authStorageService.get({ cookies });

  if (request.nextUrl.pathname == "/signin") {
    return signin(request, authResult);
  }
  if (request.nextUrl.pathname == "/signout") {
    return signout(request);
  }

  if (!authResult)
    return NextResponse.redirect(new URL("/signin", request.nextUrl));

  const needRefresh = authStorageService.needRefresh({ cookies });
  if (!needRefresh) {
    return NextResponse.next();
  }

  return refresh(request, authResult);
}
