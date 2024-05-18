import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { type cookies } from "next/headers";
import { NextResponse } from "next/server";

type NextCookies = typeof cookies;

export interface CookieHandler {
  set: (key: string, value: string) => void;
  get: (key: string, fallback?: string | undefined) => string | undefined;
  delete: (key: string) => void;
  has: (key: string) => boolean;
}

export class CookieNextHandler implements CookieHandler {
  private cookies: NextCookies | undefined;

  constructor(cookies: NextCookies | undefined) {
    this.cookies = cookies;
  }

  set(key: string, value: string) {
    setCookie(key, value, { cookies: this.cookies });
  }

  get(key: string, fallback: string | undefined = undefined) {
    if (!this.has(key)) return fallback;
    return getCookie(key, { cookies: this.cookies })!;
  }

  delete(key: string) {
    deleteCookie(key, { cookies: this.cookies });
  }

  has(key: string) {
    return hasCookie(key, { cookies: this.cookies });
  }
}

export class CookieResponseHandler implements CookieHandler {
  private response: NextResponse;

  constructor(response: NextResponse) {
    this.response = response;
  }

  set(key: string, value: string) {
    this.response.cookies.set(key, value);
  }

  get(key: string, fallback: string | undefined = undefined) {
    if (!this.has(key)) return fallback;
    return this.response.cookies.get(key)?.value;
  }

  delete(key: string) {
    this.response.cookies.delete(key);
  }

  has(key: string) {
    return this.response.cookies.has(key);
  }
}
