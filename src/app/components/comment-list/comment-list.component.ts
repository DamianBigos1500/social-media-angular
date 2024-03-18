import { Component, Input } from '@angular/core';
import { IComment } from '../../services/post.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
  @Input() comments!: IComment[];

  constructor(private router: Router) {}

}
