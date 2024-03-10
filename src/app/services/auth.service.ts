import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

export interface IAuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface IProfile {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<IAuthUser | null> =
    new BehaviorSubject<IAuthUser | null>(null);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private router = inject(Router);
  private tokenService = inject(TokenService);
  private http = inject(HttpClient);
  
  private apiUrl = 'http://localhost:8000/api/';

  canActivate(): Observable<boolean> {
    return this.user$.pipe(
      map((currentUser: any) => {
        if (!currentUser) {
          this.router.navigateByUrl('/auth');
          return false;
        }
        return true;
      })
    );
  }

  getUser$(): Observable<IAuthUser | null> {
    return this.user$.asObservable();
  }

  getUser(): Observable<IAuthUser> {
    return this.http.get(`${this.apiUrl}user/`).pipe(
      tap((response: any) => {
        if (response) {
          this.user$.next(response);
        }
      })
    );
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
      );
  }

  logout() {
    this.user$.next(null);
  }
}
