import { Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'profile/:id', component: ProfileComponent },
];
