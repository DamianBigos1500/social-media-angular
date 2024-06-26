import { IMAGE_SRC } from './../../data/constants';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AuthService, IAuthUser } from '../../services/auth.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { PostCreateFormComponent } from '../../components/post-create-form/post-create-form.component';
import { UserFriendsComponent } from '../../components/user-friends/user-friends.component';
import { DropdownComponent } from '../../components/UI/dropdown/dropdown.component';
import { IPost, PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    RouterLink,
    SidebarComponent,
    PostCardComponent,
    KeyValuePipe,
    PostListComponent,
    PostCreateFormComponent,
    UserFriendsComponent,
    AsyncPipe,
    DropdownComponent,
  ],
})
export class HomeComponent implements OnInit {
  IMAGE_SRC: string = IMAGE_SRC;

  public posts: IPost[] = [];
  public authUser: IAuthUser | null = null;

  constructor(
    // private postService: PostService,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.canActivate();

    this.authService
      .getAuthUser()
      .subscribe((authUser) => (this.authUser = authUser));

    this.postService.fetchHomePosts();
    this.postService.getPosts().subscribe((posts: IPost[]) => (this.posts = posts));
  }

}
