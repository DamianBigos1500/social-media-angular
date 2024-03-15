import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post-create-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-create-form.component.html',
  styleUrl: './post-create-form.component.scss',
})
export class PostCreateFormComponent {
  private selectedFiles: any = [];
  public previewFiles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  newPostForm = this.formBuilder.group<{ content: string }>({
    content: '',
  });

  handlePostImage(event: any) {
    this.selectedFiles = Array.from(event?.target.files);

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

  filterSelectedImage(previewFile: string) {
    // get idx
    const idx = this.previewFiles.findIndex(
      (previewFile) => previewFile == previewFile
    );

    // remove
    this.previewFiles.splice(idx, 1);
    this.selectedFiles.splice(idx, 1);
  }

  onSubmit() {
    const formData = new FormData();
    // add new post form
    if (this.newPostForm.value.content) {
      Object.entries(this.newPostForm.value).forEach(([key, value]: any[]) => {
        formData.append(key, value);
      });
    }

    // add images
    if (this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }
    }

    this.postService.createPost(formData).subscribe();

    // reset forms
    this.selectedFiles = [];
    this.previewFiles = [];
    this.newPostForm.reset();
  }
}
