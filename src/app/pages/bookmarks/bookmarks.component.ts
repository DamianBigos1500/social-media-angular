import { Component, OnInit } from '@angular/core';
import { IPost, PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';
import { BookmarkService } from '../../services/bookmark.service';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { NewPostService } from '../../services/newpost.service';

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
    private postService: NewPostService,
    private bookmarkService: BookmarkService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.canActivate();

    this.postService.fetchBookmarkedPosts();
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }
}
