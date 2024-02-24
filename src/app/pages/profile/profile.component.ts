import { PostService, IPost } from './../../services/post.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public posts: IPost[] | [] = [];
  private files = [];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private cd: ChangeDetectorRef
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
      // reader.onload = () => {

      //   // need to run CD since file load runs outside of zone
      //   this.cd.markForCheck();
      // };
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
    this.postService.getPosts().subscribe((data: IPost[]) => {
      this.posts = data;
      console.log(data);
    });
  }
}
