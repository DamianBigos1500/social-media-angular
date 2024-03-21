
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMAGE_SRC } from '../../data/constants';
import { DateAgoPipe } from '../../pipes/DateAgo/date-ago.pipe';
import { Observable, map, switchMap } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { DropdownComponent } from '../UI/dropdown/dropdown.component';
import { CommentService, IComment } from '../../services/comment.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { IAttachment, IPost, PostService } from '../../services/post.service';

@Component({
  selector: 'app-detail-post-component',
  standalone: true,
  imports: [
    DateAgoPipe,
    CommonModule,
    DropdownComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './detail-post-component.html',
  styleUrl: './detail-post-component.scss',
})
export class DetailPostComponent implements OnInit {
  IMAGE_SRC: string = IMAGE_SRC;
  post?: IPost;
  selectedImage: IAttachment | null | undefined = null;
  isSidebarOpen: boolean = true;
  public postComments?: Observable<IComment[] | []>;

  public image_id: string | null = null;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    const pid = this.route.snapshot.queryParamMap.get('pid');
    this.image_id = this.route.snapshot.queryParamMap.get('img');
    if (!pid) {
      this.router.navigate(['/'], { replaceUrl: true });
    }

    this.postComments = this.commentService.refetchComments.pipe(
      switchMap((d: any) => {
        if (pid != d && d != null) return new Observable<IComment[]>();
        else return this.commentService.getPostComments(pid as string);
      })
    );

    this.postService
      .showPostById(pid as string)
      .pipe(
        map((data) => {
          this.selectedImage = data.attachments?.find(
            (att: IAttachment) => att.id == this.image_id
          );
          return data;
        })
      )
      .subscribe((data: IPost) => (this.post = data));
  }

  commentForm = this.formBuilder.group({
    comment: ['', Validators.required],
  });

  closeDetails() {
    this.location.back();
  }

  closeSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  getSelectedImgIndex() {
    return this.post?.attachments.findIndex(
      (attr: IAttachment) => attr.id == this.selectedImage?.id
    );
  }

  setSelectedImage(move: number) {
    const imgIndex: number = this.getSelectedImgIndex() || 0;
    const newImgIndex =
      (((imgIndex + move) % this.post!.attachments.length) +
        this.post!.attachments.length) %
      this.post!.attachments.length;

    this.selectedImage = this.post?.attachments[newImgIndex];
  }

  leftImage() {
    this.setSelectedImage(-1);
  }

  rightImage() {
    this.setSelectedImage(1);
  }

  submitCommentForm() {
    if (!this.commentForm.valid) {
      console.log('Cannot send message because validation failed');
      return;
    }

    this.commentService
      .createPostComment(this.post?.id as string, {
        post_id: Number(this.post?.id),
        content: String(this.commentForm.value.comment),
      })
      .subscribe(() => {});
  }

  deleteComment(commentId: string) {
    this.commentService.deletePostComment(commentId).subscribe(() => {
      // this.post.comments_length -= 1;
    });
  }
}
