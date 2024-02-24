import { Injectable } from '@angular/core';

export type IToken = string | null;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  token: IToken = null;

  getToken(): IToken {
    return this.token || null;
  }

  setToken(token: IToken) {
    this.token = token;
  }
}
