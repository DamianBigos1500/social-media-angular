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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3QHcuY29tIiwiZXhwIjoxNzEzNjg3NTA4fQ.W69l9M0nI-h33HB4Gqpul_DGUX88g6OiB0kGrMV94fM'
    );
  }

  setToken(token: IToken) {
    localStorage.setItem('token', JSON.stringify(token));
    this.token = token;
  }
}
