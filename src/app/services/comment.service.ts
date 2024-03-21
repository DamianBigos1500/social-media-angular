import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from './user.service';
import { API_URL } from '../data/constants';

export interface IComment {
  id: string;
  post_id: string;
  content: string;
  user: IUser;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private refetchCommentsSubject = new BehaviorSubject<string | null>(null);

  private http = inject(HttpClient);
  private apiUrl = API_URL;

  get refetchComments() {
    return this.refetchCommentsSubject.asObservable();
  }

  // COMMENTS
  getPostComments(
    pid: string,
    hidden?: boolean 
  ): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.apiUrl}posts/comments/${pid}/?hide=${hidden || false}`);
  }

  createPostComment(
    pid: string,
    data: { post_id: number; content: string }
  ): Observable<IComment> {
    return this.http
      .post<IComment>(`${this.apiUrl}posts/comment/${pid}/`, data)
      .pipe(
        tap((comment: IComment) =>
          this.refetchCommentsSubject.next(comment.post_id)
        )
      );
  }

  deletePostComment(cid: string): Observable<IComment> {
    return this.http
      .delete<IComment>(`${this.apiUrl}posts/comment/${cid}/`)
      .pipe(
        tap((comment: IComment) =>
          this.refetchCommentsSubject.next(comment.post_id)
        )
      );
  }

  getUserComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.apiUrl}posts/user/comments/`);
  }
}
