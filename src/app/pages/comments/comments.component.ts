import { Component } from '@angular/core';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { IComment, IPost } from '../../services/post.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  imports: [CommentListComponent],
})
export class CommentsComponent {
  public comments: IComment[] = [];

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.canActivate();
    this.commentService.getUserComments().subscribe((comments: IComment[]) => {
      this.comments = comments;
    });
  }
}
