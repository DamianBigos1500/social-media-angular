import { Component, Input, TemplateRef, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { AuthService, IAuthUser } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { IMAGE_SRC } from '../../data/constants';
import { DropdownComponent } from '../UI/dropdown/dropdown.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterModule, AuthModalComponent, DropdownComponent],
  providers: [ModalService],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  user: IAuthUser | null = null;
  IMAGE_SRC = IMAGE_SRC;
  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUser$().subscribe((user) => {
      this.user = user;
    });
  }

  // openModal(modalTemplate: TemplateRef<any>) {
  //   this.modalService
  //     .open(modalTemplate, { size: 'lg', title: 'Foo' })
  //     .subscribe((action) => console.log('action', action));
  // }

  // closeModal() {
  //   this.modalService.closeModal();
  // }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
