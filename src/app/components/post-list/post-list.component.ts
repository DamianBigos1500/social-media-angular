import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IPost, PostService } from '../../services/post.service';
import { PostCardComponent } from '../post-card/post-card.component';
import {  switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  imports: [PostCardComponent, AsyncPipe],
})
export class PostListComponent implements OnInit, AfterViewInit {
  @Input() posts?: IPost[];
  @ViewChildren('lastPost', { read: ElementRef })

  lastPost!: QueryList<ElementRef>;
  observer?: IntersectionObserver;

  ngOnInit(): void {
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.lastPost.changes.subscribe((d) => {
      this.observer?.observe(d.last.nativeElement);
    });
  }

  intersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('scroll more');
      }
    }, options);
  }
}
