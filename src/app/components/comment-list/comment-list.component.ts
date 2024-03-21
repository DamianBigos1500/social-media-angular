import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IComment } from '../../services/post.service';

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
