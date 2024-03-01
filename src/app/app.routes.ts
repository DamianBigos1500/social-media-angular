import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RootLayoutComponent } from './layouts/root-layout/root-layout.component';
import { ConversationComponent } from './pages/conversation/conversation.component';

export const routes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'conversations', component: ConversationComponent },
      { path: 'conversation/:id', component: ConversationComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];
