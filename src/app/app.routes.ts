import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GroupDetailsComponent } from './pages/group-details/group-details.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { RootLayoutComponent } from './layouts/root-layout/root-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile/:id', component: ProfileDetailsComponent },
      { path: 'group/:id', component: GroupDetailsComponent },
      { path: 'post/:id', component: PostDetailsComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];
