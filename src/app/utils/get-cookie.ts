import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export default class Cookie {
  static getCookie(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getCookie(name: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const xsrfCookies = document.cookie
      .split(';')
      .map((c) => c.trim())
      .filter((c) => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
      return null;
    }
    return String(decodeURIComponent(xsrfCookies[0].split('=')[1]));
  }
}
