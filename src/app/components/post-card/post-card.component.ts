import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  ],
})
export class PostCardComponent {
  IMAGE_SRC: string = IMAGE_SRC;
  public isCommentsToggle = false;

  @Input() post!: IPost;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {}

  commentForm = this.formBuilder.group({
    comment: ['', Validators.required],
  });

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe();
  }

  loadMoreComments() {
    this.postService
      .getPostComments(this.post.id)
      .subscribe((comments: any) => {
        this.isCommentsToggle = !this.isCommentsToggle;
        this.post.comments = comments;
      });
  }

  toggleComments() {
    this.isCommentsToggle = !this.isCommentsToggle;
    this.post.comments.splice(2);
  }

  submitCommentForm() {
    if (!this.commentForm.valid) {
      console.log('Cannot send message because validation failed');
      return;
    }

    this.postService
      .createPostComment(this.post.id, {
        post_id: Number(this.post.id),
        content: String(this.commentForm.value.comment),
      })
      .subscribe((comment: IComment) => {
        this.post.comments.unshift(comment);
        this.post.comments_length += 1;

        if (this.post.comments_length > 2) {
          this.post.comments.pop();
        }
      });
  }

  deleteComment(commentId: string) {
    this.postService.deletePostComment(commentId).subscribe((comment) => {
      this.postService
        .getPostComments(this.post.id)
        .subscribe((comments: IComment[]) => {
          this.post.comments_length -= 1;
          comments.splice(2);
          this.post.comments = comments;
        });
    });
  }
}
