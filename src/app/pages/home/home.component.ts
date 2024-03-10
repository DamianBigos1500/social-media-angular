import { IMAGE_SRC } from './../../data/constants';
import { PostService, IPost } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { IUser, UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    PostCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  IMAGE_SRC: string = IMAGE_SRC;
  public id: string | null = null;
  public posts: IPost[] | [] = [];
  public recomended_users: IUser[] | [] = [];
  public userData: IUser | null = null;
  public authUser: IUser | null = null;
  private selectedFiles: any = null;
  public previewFiles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.canActivate();

    this.loadPosts();
    this.userService
      .getUsers()
      .subscribe((users) => (this.recomended_users = users));
  }

  newPostForm = this.formBuilder.group<{ content: string }>({
    content: '',
  });

  loadPosts() {
    this.postService
      .getPosts()
      .subscribe((data: IPost[]) => (this.posts = data));
  }

  handlePostImage(event: any) {
    this.selectedFiles = event?.target.files;

    const filesUrl: string[] = [];
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const reader = new FileReader();

      reader.readAsDataURL(this.selectedFiles[i]);
      reader.onload = (e: any) => {
        filesUrl.push(e.target.result);
      };
    }
    this.previewFiles = filesUrl;
  }

  onSubmit() {
    const formData = new FormData();
    Object.entries(this.newPostForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });

    if (this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }
    }

    this.postService.createPost(formData).subscribe((data) => this.loadPosts());
  }

  isMyProfile() {
    return false;
  }
}
