import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { API_URL } from '../data/constants';

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
  private posts: IPost[] = [];
  private postsSubject = new BehaviorSubject<IPost[]>([]);

  private fetchUrl: string = '';
  private fetchMore: boolean = false;
  private page: number = 1;

  toastr = inject(ToastrService);
  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  private resetPage() {
    this.postsSubject.next([]);
    this.page = 1;
  }

  private fetchPosts(url: string) {
    this.fetchUrl = url;

    this.http.get<IPost[]>(url).subscribe((posts: IPost[]) => {
      this.posts = posts;
      this.postsSubject.next([...this.posts]);
    });
  }

  public fetchHomePosts() {
    this.fetchMore = true;
    this.resetPage();
    this.fetchPosts(`${this.apiUrl}posts/`);
  }

  public fetchProfilePosts(pid: string) {
    this.fetchMore = false;
    this.resetPage();
    this.fetchPosts(`${this.apiUrl}posts/profile/${pid}`);
  }

  public fetchBookmarkedPosts() {
    this.fetchMore = false;
    this.resetPage();
    this.fetchPosts(`${this.apiUrl}posts/bookmarks/all`);
  }

  // REFETCHING
  public fetchMorePosts() {
    if (!this.fetchMore) return;
    this.http
      .get<IPost[]>(`${this.fetchUrl}?page=${this.page + 1}`)
      .subscribe((posts: IPost[]) => {
        if (posts.length > 0) {
          this.page += 1;
        }
        this.posts.push(...posts);
        this.postsSubject.next([...this.posts]);
      });
  }

  getPosts(): Observable<IPost[]> {
    return this.postsSubject.asObservable();
  }

  createPost(formData: FormData) {
    this.http
      .post<IPost>(`${this.apiUrl}posts/`, formData)
      .subscribe((post: IPost) => {
        this.posts.unshift(post);
        console.log(post);
        this.postsSubject.next([...this.posts]);
        this.toastr.success('Post created succcesfully!', 'Success!');
      });
  }

  showPostById(pid: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiUrl}posts/${pid}`);
  }

  deletePost(pid: string) {
    this.http
      .delete<IPost>(`${this.apiUrl}posts/${pid}`)
      .subscribe((post: IPost) => {
        this.posts = this.posts.filter((post) => post.id !== pid);
        this.postsSubject.next([...this.posts]);
        this.toastr.success('Post deleted succcesfully!', 'Success!');
      });
  }
}
