import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent implements OnInit {
  @Input('id') profileId = '';
  // route = inject(ActivatedRoute);
  user = signal<any>(null);
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserById(this.profileId).subscribe((user) => {
      this.user.update(() => user);
    });
  }
}
