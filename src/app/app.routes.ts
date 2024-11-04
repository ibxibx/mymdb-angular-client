/**
 * @packageDocumentation
 * @module Core/Routes
 * @preferred
 *
 * @description
 * This module defines the routing configuration for the application,
 * including route definitions and authentication guards.
 */

import { Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

/**
 * Authentication guard function that protects routes from unauthorized access.
 *
 * @remarks
 * This function checks localStorage for user credentials to determine
 * if a route can be accessed.
 *
 * @returns {boolean} True if user is authenticated, false otherwise
 */
function authGuard(): boolean {
  return !!localStorage.getItem('user') && !!localStorage.getItem('token');
}

/**
 * Application route definitions specifying the navigation structure.
 *
 * @remarks
 * This constant defines all available routes in the application:
 * - Public routes (welcome page)
 * - Protected routes (movies, profile)
 * - Redirection routes (default, wildcard)
 *
 * Protected routes use the authGuard function to prevent
 * unauthorized access.
 *
 * @public
 * @constant
 * @type {Routes}
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
