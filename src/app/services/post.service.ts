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
  comments_length: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private refetchSubject = new BehaviorSubject(null);

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/';

  get refetch() {
    return this.refetchSubject.asObservable();
  }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.apiUrl}posts/`);
  }

  createPost(formData: FormData) {
    return this.http
      .post(`${this.apiUrl}posts/`, formData)
      .pipe(tap(() => this.refetchSubject.next(null)));
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
      .pipe(tap(() => this.refetchSubject.next(null)));
  }

  // COMMENTS
  getPostComments(pid: string) {
    return this.http.get<IComment[]>(`${this.apiUrl}posts/comments/${pid}/`);
  }

  createPostComment(
    pid: string,
    data: { post_id: number; content: string }
  ): Observable<IComment> {
    return this.http.post<IComment>(
      `${this.apiUrl}posts/comment/${pid}/`,
      data
    );
  }

  deletePostComment(cid: string) {
    return this.http.delete(`${this.apiUrl}posts/comment/${cid}/`);
  }

  // BOOKMARKS
  getBookmarkedPosts(): Observable<IPost[]> {
    return this.http.post<IPost[]>(`${this.apiUrl}posts/bookmarks/`, null);
  }
}
