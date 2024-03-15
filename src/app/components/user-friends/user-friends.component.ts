import { Component } from '@angular/core';
import { IUser, UserService } from '../../services/user.service';
import { IMAGE_SRC } from '../../data/constants';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-friends',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './user-friends.component.html',
  styleUrl: './user-friends.component.scss',
})
export class UserFriendsComponent {
  IMAGE_SRC: string = IMAGE_SRC;

  public recommended_users?: Observable<IUser[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.recommended_users = this.userService.getUsers();
  }
}
