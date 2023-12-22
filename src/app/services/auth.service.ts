import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCookie(name: string) {
    if (!document.cookie) {
      return null;
    }

    const xsrfCookies = document.cookie
      .split(';')
      .map((c) => c.trim())
      .filter((c) => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
      return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }

  getUser() {
    return this.http
      .get(`${this.apiUrl}/auth/user/`, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': String(this.getCookie('csrftoken')),
        },
      })
      .pipe(catchError(this.handleError<any>('getUser', [])));
  }

  login(data: { email: string; password: string }) {
    return this.http
      .post(
        `http://127.0.0.1:8000/auth/login/`,
        {
          email: 'h@a.com',
          password: '12345678',
        },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': String(this.getCookie('csrftoken')),
          },
        }
      )
      .pipe(catchError(this.handleError<any>('getUser', [])));
  }

  logout() {
    return this.http
      .post(`${this.apiUrl}/auth/logout/`, null, {
        withCredentials: true,
        headers: {
          'content-type': 'application/json',
          'X-CSRFToken': String(this.getCookie('csrftoken')),
        },
      })
      .pipe(catchError(this.handleError<any>('getUser', [])));
  }
}
