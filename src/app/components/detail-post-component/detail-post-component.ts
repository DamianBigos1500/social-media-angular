import { IAttachment, IPost, PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMAGE_SRC } from '../../data/constants';
import { DateAgoPipe } from '../../pipes/DateAgo/date-ago.pipe';
import { map } from 'rxjs';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-detail-post-component',
  standalone: true,
  imports: [DateAgoPipe, CommonModule],
  templateUrl: './detail-post-component.html',
  styleUrl: './detail-post-component.scss',
})
export class DetailPostComponent implements OnInit {
  IMAGE_SRC: string = IMAGE_SRC;
  post: IPost | null = null;
  selectedImage: IAttachment | null | undefined = null;
  isSidebarOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit() {
    const pid = this.route.snapshot.queryParamMap.get('pid');
    const img_id = this.route.snapshot.queryParamMap.get('img');
    if (!pid) {
      this.router.navigate(['/'], { replaceUrl: true });
    }

    this.postService
      .showPostById(pid as string)
      .pipe(
        map((data) => {
          this.selectedImage = data.attachments.find(
            (att: IAttachment) => att.id == img_id
          );
          return data;
        })
      )
      .subscribe((data: IPost) => (this.post = data));
  }

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
}
