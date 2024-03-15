import { IMAGE_SRC } from './../../data/constants';
import { PostService, IPost } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { IUser, UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { KeyValuePipe } from '@angular/common';
import { PostListComponent } from "../../compoennts/post-list/post-list.component";
import { PostCreateFormComponent } from "../../components/post-create-form/post-create-form.component";
import { UserFriendsComponent } from "../../components/user-friends/user-friends.component";

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
        UserFriendsComponent
    ]
})
export class HomeComponent implements OnInit {
  IMAGE_SRC: string = IMAGE_SRC;
  public id: string | null = null;
  public posts: IPost[] | [] = [];
  public authUser: IUser | null = null;


  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.canActivate();
  }

}
