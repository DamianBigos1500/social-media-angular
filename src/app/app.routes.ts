import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RootLayoutComponent } from './layouts/root-layout/root-layout.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DetailPostComponent } from './components/detail-post-component/detail-post-component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { SidebarLayotuComponent } from './layouts/sidebar-layotu/sidebar-layotu.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'post',
    component: DetailPostComponent,
  },
  {
    path: '',
    component: RootLayoutComponent,
    children: [
      {
        path: '',
        component: SidebarLayotuComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'profile/:id', component: ProfileComponent },
          { path: 'bookmarks', component: BookmarksComponent },
          { path: 'comments', component: CommentsComponent },
        ],
      },
      { path: 'conversations', component: ConversationComponent },
      { path: 'conversation/:id', component: ConversationComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];
