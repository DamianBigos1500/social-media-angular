import { Component, Input, OnInit } from '@angular/core';
import { IMAGE_SRC } from '../../data/constants';
import { IComment, IPost, PostService } from '../../services/post.service';
import { DateAgoPipe } from '../../pipes/DateAgo/date-ago.pipe';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownComponent } from '../UI/dropdown/dropdown.component';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  imports: [
    DateAgoPipe,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    DropdownComponent,
    AsyncPipe,
  ],
})
export class PostCardComponent implements OnInit {
  IMAGE_SRC: string = IMAGE_SRC;

  @Input() post!: IPost;
  public postComments?: Observable<IComment[] | []>;

  public isCommentsToggle = false;

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.postComments = this.commentService.refetchComments.pipe(
      switchMap((d: any) => {
        if (this.post.id != d && d != null) return new Observable<IComment[]>();
        else return this.commentService.getPostComments(this.post.id);
      })
    );
  }

  commentForm = this.formBuilder.group({
    comment: ['', Validators.required],
  });

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe();
  }

  toggleComments() {
    this.isCommentsToggle = !this.isCommentsToggle;
    // this.post.comments.splice(2);
  }

  submitCommentForm() {
    if (!this.commentForm.valid) {
      console.log('Cannot send message because validation failed');
      return;
    }

    this.commentService
      .createPostComment(this.post.id, {
        post_id: Number(this.post.id),
        content: String(this.commentForm.value.comment),
      })
      .subscribe(() => {
        this.post.comments_length += 1;
      });
  }

  deleteComment(commentId: string) {
    this.commentService.deletePostComment(commentId).subscribe(() => {
      this.post.comments_length -= 1;
    });
  }
}
