import { Component, Input, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { AuthUser } from '../../services/auth.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { IMAGE_SRC } from '../../data/constants';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, AuthModalComponent],
  providers: [ModalService],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  user: AuthUser;
  IMAGE_SRC = IMAGE_SRC
  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.authService.getUser$().subscribe((user) => {
      this.user = user;
    });
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Foo' })
      .subscribe((action) => console.log('action', action));
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
