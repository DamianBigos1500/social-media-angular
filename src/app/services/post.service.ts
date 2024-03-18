import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IUser } from './user.service';
import { ToastrService } from 'ngx-toastr';

export interface IAttachment {
  id: string;
  path: string;
}
export interface IComment {
  id: string;
  post_id: string;
  content: string;
  user: IUser;
  post?: IPost;
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

  toastr = inject(ToastrService);
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/';

  get refetchPosts() {
    return this.refetchPostsSubject.asObservable();
  }

  getPosts(page: number = 1): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.apiUrl}posts/?page=${page}`);
  }

  createPost(formData: FormData) {
    return this.http
      .post(`${this.apiUrl}posts/`, formData)
      .pipe(tap(() => this.refetchPostsSubject.next(null)))
      .pipe(
        map(() => this.toastr.success('Post created succcesfully!', 'Success!'))
      )
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
}
