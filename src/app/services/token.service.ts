import { Injectable } from '@angular/core';

export type IToken = string | null;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  token: IToken = null;

  getToken(): IToken {
    // const token = localStorage.getItem('token');
    // console.log(token)

    return (
      this.token ||
      '.eyJzdWIiOiJ3QHcuY29tIiwiZXhwIjoxNzEzNTA0MTcwfQ.yv3ZfbcGieJvnXznn_6d3vlVScnjvZw2GajLwn82-pg'
    );
  }

  setToken(token: IToken) {
    localStorage.setItem('token', JSON.stringify(token));
    this.token = token;
  }
}
