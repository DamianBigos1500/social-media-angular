import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  ngOnInit() {}
}
