import { Component, Input } from '@angular/core';
import { IMAGE_SRC } from '../../data/constants';
import { IPost } from '../../services/post.service';
import { DateAgoPipe } from '../../pipes/DateAgo/date-ago.pipe';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [DateAgoPipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  IMAGE_SRC: string = IMAGE_SRC;

  @Input() post!: IPost;
}
