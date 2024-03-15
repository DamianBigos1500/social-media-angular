import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { IUser } from './user.service';

export interface IAttachment {
  id: string;
  path: string;
}
export interface IComment {
  id: string;
  post_id: string;
  content: string;
  user: IUser;
}
export interface IPost {
  id: string;
  content: string;
  creator: IUser;
  attachments: IAttachment[];
  // comments: IComment[];
  created_at: Date;
  comments_length: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private refetchPostsSubject = new BehaviorSubject(null);
  private refetchCommentsSubject = new BehaviorSubject(null);

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/';

  get refetchPosts() {
    return this.refetchPostsSubject.asObservable();
  }
  get refetchComments() {
    return this.refetchCommentsSubject.asObservable();
  }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.apiUrl}posts/`);
  }

  createPost(formData: FormData) {
    return this.http
      .post(`${this.apiUrl}posts/`, formData)
      .pipe(tap(() => this.refetchPostsSubject.next(null)));
  }

  showPostById(pid: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiUrl}posts/${pid}`);
  }

  getProfilePosts(pid: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.apiUrl}posts/profile/${pid}`);
  }

  deletePost(pid: string): Observable<IPost> {
    return this.http
      .delete<IPost>(`${this.apiUrl}posts/${pid}`)
      .pipe(tap(() => this.refetchPostsSubject.next(null)));
  }

  // BOOKMARKS
  getBookmarkedPosts(): Observable<IPost[]> {
    return this.http.post<IPost[]>(`${this.apiUrl}posts/bookmarks/`, null);
  }
}
