import { NewPostService } from './../../services/newpost.service';
import { PostService } from './../../services/post.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IPost } from '../../services/post.service';
import { PostCardComponent } from '../post-card/post-card.component';
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

  public lastPost!: QueryList<ElementRef>;
  private observer?: IntersectionObserver;

  constructor(
    private postService: NewPostService,
  ) {}

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
        this.postService.fetchMorePosts()
      }
    }, options);
  }
}
