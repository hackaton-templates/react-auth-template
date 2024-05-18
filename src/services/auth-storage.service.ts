import { CookieOpts, CookieService } from "./cookie.service";
import { AuthResult } from "@/types/auth.type";

class AuthStorageService extends CookieService {
  constructor() {
    super("auth");
  }

  needRefresh(cookies: CookieOpts = {}) {
    const authResult = this.get(cookies);
    if (!authResult)
      throw Error("Failed to get auth data. Maybe you are not authorized.");

    const expires = authResult.access_token.expires;
    const now = Math.round(Date.now() / 1000);
    return expires - now <= 0;
  }

  get(cookies?: CookieOpts) {
    return super.get(cookies) as AuthResult | null;
  }

  set(data: AuthResult, cookies?: CookieOpts): void {
    return super.set(data, cookies);
  }
}

const authStorageService = new AuthStorageService();
export default authStorageService;
