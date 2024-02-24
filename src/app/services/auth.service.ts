import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { TokenService } from './token.service';


export type AuthUser = any | null | undefined;
interface AuthState {
  user: AuthUser;
}

interface GetUserResponse {
  user: AuthUser;
}

const initialState: AuthState = {
  user: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$: BehaviorSubject<AuthUser> = new BehaviorSubject<AuthUser>(null);
  isLoggedIn$ = new BehaviorSubject<AuthUser>(null);

  private tokenService = inject(TokenService);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/';

  getUser$(): Observable<boolean> {
    return this.user$.asObservable();
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

  getUser() {
    return this.http
      .get<GetUserResponse>(`${this.apiUrl}user/`, {
        withCredentials: true,
     
      })
      .pipe(
        tap((response: GetUserResponse) => {
          if (response.user) {
            this.user$.next(response.user);
          }
        })
      )
      .pipe(catchError(this.handleError<any>('getUser', [])));
  }

  login({ email, password }: LoginModel) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    return this.http
      .post(`http://127.0.0.1:8000/api/token/`, formData, {
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          if (response.access_token) {
            this.tokenService.setToken(response.access_token);
          }
        })
      )
      .pipe(catchError(this.handleError<any>('getUser', [])));
  }

  logout() {
    this.user$.next(null);
    // return this.http
    //   .post(`${this.apiUrl}/auth/logout/`, null, {
    //     withCredentials: true,
    //     headers: {
    //       'content-type': 'application/json',
    //       'X-CSRFToken': String(this.getCookie('csrftoken')),
    //     },
    //   })
    //   .pipe(catchError(this.handleError<any>('getUser', [])));
  }
}
