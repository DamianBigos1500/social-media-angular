import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGE_SRC } from '../../data/constants';
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
import { CommentService, IComment } from '../../services/comment.service';
import { BookmarkService } from '../../services/bookmark.service';
import { IPost, PostService } from '../../services/post.service';

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
export class PostCardComponent implements OnInit {
  IMAGE_SRC: string = IMAGE_SRC;

  @Input() post!: IPost;
  public postComments: IComment[] = [];
  public isBookmarked: boolean | null = null;

  public isCommentsHidden: boolean = true;

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private bookmarkService: BookmarkService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commentService.refetchComments
      .pipe(
        switchMap((d: any) => {
          if (this.post.id != d && d != null)
            return new Observable<IComment[]>();
          else return this.commentService.getPostComments(this.post.id, this.isCommentsHidden);
        })
      )
      .subscribe((postComments) => (this.postComments = postComments));

    this.bookmarkService
      .checkIsBookmarked(this.post.id)
      .subscribe((isBookmarked) => (this.isBookmarked = isBookmarked));
  }

  commentForm = this.formBuilder.group({
    comment: ['', Validators.required],
  });

  deletePost() {
    this.postService.deletePost(this.post.id);
  }

  toggleComments() {
    this.isCommentsHidden = !this.isCommentsHidden;
    this.commentService
      .getPostComments(this.post.id, this.isCommentsHidden)
      .subscribe((postComments) => (this.postComments = postComments));
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

  addToBookmarks() {
    this.bookmarkService.addBookmarkedPost(this.post.id).subscribe(() => {
      this.isBookmarked = true;
      this.toastr.success('Post added to bookmarks', 'Success');
    });
  }

  removeFormBookmarks() {
    this.bookmarkService.removeBookmarkedPost(this.post.id).subscribe(() => {
      this.isBookmarked = false;
      this.toastr.success('Post removed from bookmarks', 'Success');
    });
  }
}
