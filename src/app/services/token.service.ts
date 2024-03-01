import { Injectable } from '@angular/core';

export type IToken = string | null;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  token: IToken = null;

  getToken(): IToken {
    return this.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3QHcuY29tIiwiZXhwIjoxNzEyNDY2MDI1fQ.hGb44gNO2oCncEEPCdbnEFvIVbNqxeBLbhLXMp2sk_E';
  }

  setToken(token: IToken) {
    this.token = token;
  }
}
