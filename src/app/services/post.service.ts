import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';

export interface IPost {
  id: string;
  content: string;
  attachments: any;
  creator: any;
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
