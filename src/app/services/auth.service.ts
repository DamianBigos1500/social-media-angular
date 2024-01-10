import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';

type AuthUser = any | null | undefined;
interface AuthState {
  user: AuthUser;
}

const initialState: AuthState = {
  user: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000';

  state = signal<AuthState>(initialState);
  user = computed(() => this.state().user);

  setUserSignal(userData: any | null) {
    console.log(userData);
    this.state.update((data) => ({ user: userData }));
  }

  handleError<T>(operation = 'operation', result?: T) {
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
      })
      .pipe(catchError(this.handleError<any>('getUser', [])));
  }

  login(loginModel: LoginModel) {
    return this.http
      .post(`http://127.0.0.1:8000/auth/login/`, loginModel, {
        withCredentials: true,
      })
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