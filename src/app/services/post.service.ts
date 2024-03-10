import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { IUser } from './user.service';

export interface IAttachment {
  id: string;
  path: string;
}
export interface IComment {
  id: string;
  content: string;
  user: IUser;
}
export interface IPost {
  id: string;
  content: string;
  creator: IUser;
  attachments: IAttachment[];
  comments: IComment[];
  created_at: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/';

  getPosts(): Observable<any> {
    return this.http.get<IPost[]>(`${this.apiUrl}posts/`);
  }
  createPost(formData: FormData) {
    return this.http.post(`${this.apiUrl}posts/`, formData, {
      withCredentials: true,
    });
  }
}
