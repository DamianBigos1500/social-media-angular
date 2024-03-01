import { IMAGE_SRC } from './../../data/constants';
import { PostService, IPost } from './../../services/post.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { IUser, UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, SidebarComponent],
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
  private files = [];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  newPostForm = this.formBuilder.group<{ content: string; files: any }>({
    content: '',
    files: [],
  });

  onFileChange(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.files = event.target.files;

      console.log(file);
      reader.readAsDataURL(file);

      this.newPostForm.patchValue({
        files: file,
      });
    }
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

  isMyProfile() {
    return false;
  }
}
