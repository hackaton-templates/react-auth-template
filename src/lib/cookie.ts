import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { type cookies } from "next/headers";
import type * as cookiesnext from "cookies-next";
import { NextResponse } from "next/server";

type NextCookies = typeof cookies;
type JsCookies = typeof cookiesnext;

export interface CookieHandler {
  set: (key: string, value: string) => Promise<void>;
  get: (
    key: string,
    fallback?: string | undefined
  ) => Promise<string | undefined>;
  delete: (key: string) => Promise<void>;
  has: (key: string) => Promise<boolean>;
}

export class CookieNextHandler implements CookieHandler {
  private cookies: NextCookies | undefined;

  constructor(cookies: NextCookies | undefined) {
    this.cookies = cookies;
  }

  async set(key: string, value: string) {
    setCookie(key, value, { cookies: this.cookies });
  }

  async get(key: string, fallback: string | undefined = undefined) {
    if (!this.has(key)) return fallback;
    return getCookie(key, { cookies: this.cookies })!;
  }

  async delete(key: string) {
    deleteCookie(key, { cookies: this.cookies });
  }

  async has(key: string) {
    return hasCookie(key, { cookies: this.cookies });
  }
}

export class CookieResponseHandler implements CookieHandler {
  private response: NextResponse;

  constructor(response: NextResponse) {
    this.response = response;
  }

  async set(key: string, value: string) {
    this.response.cookies.set(key, value);
  }

  async get(key: string, fallback: string | undefined = undefined) {
    if (!(await this.has(key))) return fallback;
    return this.response.cookies.get(key)?.value;
  }

  async delete(key: string) {
    this.response.cookies.delete(key);
  }

  async has(key: string) {
    return this.response.cookies.has(key);
  }
}

export class CookieMixedHandler implements CookieHandler {
  private isServer: boolean = false;
  private handler: ReturnType<NextCookies> | JsCookies | undefined;

  constructor() {
    if (typeof window === "undefined") {
      this.isServer = true;
    }
  }

  async set(key: string, value: string) {
    const handler = await this._getHandler();
    if (this.isServer) {
      (handler as ReturnType<NextCookies>).set(key, value);
    }
    (handler as JsCookies).setCookie(key, value);
  }

  async get(key: string, fallback: string | undefined = undefined) {
    if (!(await this.has(key))) return fallback;

    const handler = await this._getHandler();
    if (this.isServer) {
      return (handler as ReturnType<NextCookies>).get(key)!.value;
    }
    return (handler as JsCookies).getCookie(key);
  }

  async delete(key: string) {
    const handler = await this._getHandler();
    if (this.isServer) {
      (handler as ReturnType<NextCookies>).delete(key);
    }
    (handler as JsCookies).deleteCookie(key);
  }

  async has(key: string) {
    const handler = await this._getHandler();
    if (this.isServer) {
      return (handler as ReturnType<NextCookies>).has(key);
    }
    return (handler as JsCookies).hasCookie(key);
  }

  private async _getHandler() {
    if (this.handler !== undefined) return this.handler;

    if (typeof window === "undefined") {
      const handler = await import("next/headers");
      this.handler = handler.cookies();
    } else {
      const handler = await import("cookies-next");
      this.handler = handler;
    }
    return this.handler;
  }
}
