import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPost } from './post.service';
import { API_URL } from '../data/constants';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private refetchBookmarksSubject = new BehaviorSubject(null);

  private http = inject(HttpClient);
  private apiUrl = API_URL;

  get refetchBookmarks() {
    return this.refetchBookmarksSubject.asObservable();
  }

  getBookmarkedPosts(): Observable<IPost[]> {
    return this.http.post<IPost[]>(`${this.apiUrl}posts/bookmarks/`, {});
  }

  checkIsBookmarked(pid: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}posts/check/bookmarks/${pid}`);
  }

  addBookmarkedPost(pid: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}posts/bookmarks/${pid}`, {})
      .pipe(tap(() => this.refetchBookmarksSubject.next(null)));
  }

  removeBookmarkedPost(pid: string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}posts/bookmarks/${pid}`)
      .pipe(tap(() => this.refetchBookmarksSubject.next(null)));
  }
}
