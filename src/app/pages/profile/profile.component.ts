import { IMAGE_SRC } from './../../data/constants';
import { PostService, IPost } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { IUser, UserService } from '../../services/user.service';
import { AuthService, IAuthUser } from '../../services/auth.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { forkJoin } from 'rxjs';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { UserFriendsComponent } from '../../components/user-friends/user-friends.component';
import { NewPostService } from '../../services/newpost.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    PostCardComponent,
    PostListComponent,
    UserFriendsComponent,
  ],
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
    private postService: NewPostService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.authService.getAuthUser().subscribe((user: IAuthUser | null) => {
        this.authUser = user;
        // get route id and fetch rest of data
        this.id = String(params.get('id'));
        this.postService.fetchProfilePosts(this.id);
        this.isMyProfile = this.authUser?.id == this.id;

        this.postService.getPosts().subscribe((posts) => (this.posts = posts));
      });

      forkJoin({
        user: this.userService.showUser(this.id as string),
        friendStatus: this.userService.getFriendStatus(this.id as string),
        friends: this.userService.getUsers(),
      }).subscribe((data) => {
        // set data
        this.userData = data.user;
        this.friendStatus = data.friendStatus;
        this.friends = data.friends;

        // check is this my profile or not
        this.isLoading = false;
      });
    });
  }

  private profileFile: any = null;
  private coverFile: any = null;

  profileUrl?: string | ArrayBuffer | null = null;
  coverUrl?: string | ArrayBuffer | null = null;

  handleProfileImage(event: any, type: string) {
    if (type == 'profile') {
      this.profileFile = event?.target.files[0];
    } else {
      this.coverFile = event?.target.files[0];
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      if (type == 'profile') {
        this.profileUrl = event.target?.result;
      } else {
        this.coverUrl = event.target?.result;
      }
    };
  }

  uploadNewImage() {
    const formData = new FormData();
    formData.append('profile_file', this.profileFile);
    formData.append('cover_file', this.coverFile);

    if (this.profileFile) {
      this.userService.updateProfileImage(formData).subscribe(() => {
        this.authService.fetchUser();
        this.closeProfileUpload();
      });
    }
    if (this.coverFile) {
      this.userService.updateCoverImage(formData).subscribe(() => {
        this.authService.fetchUser();
        console.log(this.authUser);
        this.closeProfileUpload();
      });
    }
  }

  closeProfileUpload() {
    this.coverUrl = null;
    this.coverFile = null;
    this.profileUrl = null;
    this.profileFile = null;
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
