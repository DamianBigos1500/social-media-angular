import { IMAGE_SRC } from './../../data/constants';
import { PostService, IPost } from './../../services/post.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { IUser, UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';

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
  public id: string | null = null;
  public authUser: IUser | null = null;

  public recomended_users: IUser[] | [] = [];

  public userData: IUser | null = null;
  public posts: IPost[] | [] = [];
  public friendStatus: any;

  private files = [];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  newPostForm = this.formBuilder.group<{ content: string; files: any }>({
    content: '',
    files: [],
  });

  file: any = null;
  profileUrl: string | ArrayBuffer | null | undefined = null;

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
      this.userService
        .showUser(this.id as string)
        .subscribe((userData: IUser) => (this.userData = userData));
    });
  }

  onSubmit() {
    const formData = new FormData();
    Object.entries(this.newPostForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });

    console.log(this.newPostForm.get('files')?.value);

    this.postService
      .createPost(formData)
      .subscribe((data) => console.log(data));
  }

  ngOnInit(): void {
    console.log(this.authUser?.id == this.id);

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.userService
        .showUser(this.id as string)
        .subscribe((userData: IUser) => (this.userData = userData));

      this.userService
        .getFriendStatus(this.id as string)
        .subscribe((friendStatus) => (this.friendStatus = friendStatus));
    });

    this.authService
      .getUser$()
      .subscribe((user: any) => (this.authUser = user));
    this.postService
      .getPosts()
      .subscribe((data: IPost[]) => (this.posts = data));
    this.userService
      .getUsers()
      .subscribe((users) => (this.recomended_users = users));
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

  get isMyProfile() {
    console.log(this.authUser?.id == this.id);
    return this.authUser?.id == this.id;
  }
}
