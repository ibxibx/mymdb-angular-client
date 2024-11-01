/**
 * @fileoverview Application routing configuration
 * @module AppRoutes
 */

import { Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

/**
 * @function authGuard
 * @description Authentication guard function to protect routes
 * @returns {boolean} True if user is authenticated, false otherwise
 */
function authGuard() {
  return !!localStorage.getItem('user') && !!localStorage.getItem('token');
}

/**
 * @constant {Routes} routes
 * @description Defines the application's routing configuration
 * @property {Route} welcome - Route for welcome page
 * @property {Route} movies - Protected route for movie listings
 * @property {Route} profile - Protected route for user profile
 * @property {Route} default - Default redirect to welcome page
 * @property {Route} wildcard - Wildcard route redirects to welcome page
 */
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
