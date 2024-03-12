import { IMAGE_SRC } from './../../data/constants';
import { PostService, IPost } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { IUser, UserService } from '../../services/user.service';
import { AuthService, IAuthUser } from '../../services/auth.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    PostCardComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  IMAGE_SRC: string = IMAGE_SRC;

  public id?: string;
  public userData?: IUser;
  public friends?: IUser[];
  public friendStatus: any = null;
  public authUser?: IAuthUser | null;
  public posts?: IPost[];

  public isMyProfile?: boolean;
  public isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: IAuthUser | null) => {
      this.authUser = user;
      if (!user) {
        this.router.navigate(['/auth']);
      }
      // get route id and fetch rest of data
      this.route.paramMap.subscribe((params) => {
        this.id = String(params.get('id'));

        forkJoin({
          user: this.userService.showUser(this.id as string),
          friendStatus: this.userService.getFriendStatus(this.id as string),
          friends: this.userService.getUsers(),
          posts: this.postService.getPosts(),
        }).subscribe((data) => {
          // set data
          this.userData = data.user;
          this.friendStatus = data.friendStatus;
          this.friends = data.friends;
          this.posts = data.posts;

          // check is this my profile or not
          this.isMyProfile = this.authUser?.id == this.id;

          this.isLoading = false;
        });
      });
    });
  }

  file: any = null;
  profileUrl?: string | ArrayBuffer | null = null;

  handleProfileImage(event: any) {
    this.file = event?.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.profileUrl = event.target?.result;
    };
  }

  uploadNewImage() {
    const formData = new FormData();
    formData.append('file', this.file);

    this.userService.updateProfileImage(formData).subscribe(() => {
      this.authService.getUser().subscribe();
      this.userService
        .showUser(this.id as string)
        .subscribe((userData: IUser) => {
          this.userData = userData;
          this.profileUrl = null;
          this.file = null;
        });
    });
  }

  sendFriendRequest(friendId: string) {
    this.userService
      .sendFriendRequest(friendId)
      .subscribe((friendStatus) => (this.friendStatus = friendStatus));
  }

  deleteFriendRequest(friendId: string) {
    this.userService
      .deleteFriendRequest(friendId)
      .subscribe((friendStatus) => (this.friendStatus = friendStatus));
  }
}
