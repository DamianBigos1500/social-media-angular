import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { TokenService } from './token.service';

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

  private tokenService = inject(TokenService);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/';

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
            document.cookie = `name=oeschger; SameSite=None; Secure`;
            this.tokenService.setToken(response.access_token);
          }
        })
      );
  }

  logout() {
    this.user$.next(null);
  }

  setProfileImage(newProfileImage: string) {
    
  }
}
