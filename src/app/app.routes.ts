import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GroupDetailsComponent } from './pages/group-details/group-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RootLayoutComponent } from './layouts/root-layout/root-layout.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';

export const routes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile/:id', component: ProfileComponent },
      // { path: 'group/:id', component: GroupDetailsComponent },
      // { path: 'post/:id', component: PostDetailsComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];
