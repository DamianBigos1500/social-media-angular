import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  httpClient = inject(HttpClient);
  postData: any = [];

  postId;

  constructor(private route: ActivatedRoute) {
    this.postId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/posts/' + this.postId)
      .subscribe((data) => {
        console.log(data);
        this.postData = data;
      });
  }
}
