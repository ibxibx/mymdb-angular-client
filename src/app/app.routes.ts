import { Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

// Auth guard function
function authGuard() {
  return !!localStorage.getItem('user') && !!localStorage.getItem('token');
}

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  {
    path: 'movies',
    component: MovieCardComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [() => authGuard()],
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome' },
];
