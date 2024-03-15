import { Component } from '@angular/core';
import { IPost, PostService } from '../../services/post.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  imports: [PostCardComponent, AsyncPipe],
})
export class PostListComponent {
  public posts: Observable<IPost[]> | undefined;

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.posts = this.postService.refetch.pipe(
      switchMap(() => this.postService.getPosts())
    );
  }
}
