import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/LoginModel';

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  profile: IProfile
}

export interface IProfile {
  cover_image: string;
}

export interface IUserData {
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
export class FriendService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/';

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}users/`);
  }

  showUser(userId: string): Observable<IUserData> {
    return this.http.get<IUserData>(`${this.apiUrl}users/${userId}`);
  }
}
