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

  async get(cookies: CookieOpts = {}) {
    const cookie = this._getHandler(cookies);
    if (!(await cookie.has(this.name))) return null;
    const raw = (await cookie.get(this.name))!;
    const data = JSON.parse(raw);
    return data;
  }

  async set(data: any, cookies: CookieOpts = {}) {
    const cookie = this._getHandler(cookies);
    await cookie.set(this.name, JSON.stringify(data));
  }

  async remove(cookies: CookieOpts = {}) {
    const cookie = this._getHandler(cookies);
    await cookie.delete(this.name);
  }

  private _getHandler(cookies: CookieOpts) {
    if (cookies.cookieHandler != undefined) return cookies.cookieHandler;
      return new CookieNextHandler(cookies.cookies);
  }
}
