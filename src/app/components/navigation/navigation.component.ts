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
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterModule, AuthModalComponent, DropdownComponent],
  providers: [ModalService],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  IMAGE_SRC = IMAGE_SRC;

  authUser: IAuthUser | null = null;
  isDarkMode: boolean;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit() {
    this.authService.getAuthUser().subscribe((authUser) => {
      this.authUser = authUser;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
