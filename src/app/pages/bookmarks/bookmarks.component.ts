import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { IPost, PostService } from '../../services/post.service';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
  imports: [PostListComponent],
})
export class BookmarksComponent implements OnInit {
  public posts: IPost[] = [];

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.canActivate();

    this.postService.fetchBookmarkedPosts();
    this.postService.getPosts().subscribe((posts: IPost[]) => (this.posts = posts));
  }
}
