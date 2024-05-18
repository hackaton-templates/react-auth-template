import { CookieHandler, CookieNextHandler } from "@/lib/cookie";
import { type cookies } from "next/headers";

type NextCookies = typeof cookies;
export type CookieOpts = {
  cookies?: NextCookies;
  cookieHandler?: CookieHandler;
};

export class CookieService {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  get(cookies: CookieOpts = {}) {
    const cookie = this._getHandler(cookies);
    if (!cookie.has(this.name)) return null;
    const raw = cookie.get(this.name)!;
    const data = JSON.parse(raw);
    return data;
  }

  set(data: any, cookies: CookieOpts = {}) {
    const cookie = this._getHandler(cookies);
    cookie.set(this.name, JSON.stringify(data));
  }

  remove(cookies: CookieOpts = {}) {
    const cookie = this._getHandler(cookies);
    cookie.delete(this.name);
  }

  private _getHandler(cookies: CookieOpts) {
    if (cookies.cookieHandler != undefined) return cookies.cookieHandler;
    return new CookieNextHandler(cookies.cookies);
  }
}
