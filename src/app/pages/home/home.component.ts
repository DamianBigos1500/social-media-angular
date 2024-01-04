import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  httpClient = inject(HttpClient);
  data: any = [];

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        console.log(data);
        this.data = data;
      });
  }
}
