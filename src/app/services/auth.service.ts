import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { IProfile } from './user.service';
import { API_URL } from '../data/constants';

export interface IAuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  profile: IProfile;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser: IAuthUser | null = null;
  private authUserSubject: BehaviorSubject<IAuthUser | null> =
    new BehaviorSubject<IAuthUser | null>(null);

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private router = inject(Router);
  private tokenService = inject(TokenService);
  private http = inject(HttpClient);

  private apiUrl = API_URL;

  constructor() {
    this.fetchUser();
  }

  canActivate() {
    this.authUser;
  }

  getAuthUser(): Observable<IAuthUser | null> {
    return this.authUserSubject.asObservable();
  }

  fetchUser() {
    this.http.get<IAuthUser>(`${this.apiUrl}user/`).subscribe((authUser) => {
      this.authUser = authUser;
      this.authUserSubject.next(authUser);
    });
  }

  login({ email, password }: LoginModel) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    return this.http
      .post(`${this.apiUrl}token/`, formData, {
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
    this.authUserSubject.next(null);
  }
}
