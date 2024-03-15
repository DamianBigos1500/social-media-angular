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
export class CommentService {
  private refetchCommentsSubject = new BehaviorSubject<string | null>(null);

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/';

  get refetchComments() {
    return this.refetchCommentsSubject.asObservable();
  }

  // COMMENTS
  getPostComments(pid: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.apiUrl}posts/comments/${pid}/`);
  }

  createPostComment(
    pid: string,
    data: { post_id: number; content: string }
  ): Observable<IComment> {
    return this.http
      .post<IComment>(`${this.apiUrl}posts/comment/${pid}/`, data)
      .pipe(
        tap((comment: IComment) => this.refetchCommentsSubject.next(comment.post_id))
      );
  }

  deletePostComment(cid: string): Observable<IComment> {
    return this.http
      .delete<IComment>(`${this.apiUrl}posts/comment/${cid}/`)
      .pipe(
        tap((comment: IComment) => this.refetchCommentsSubject.next(comment.post_id))
      );
  }
}
