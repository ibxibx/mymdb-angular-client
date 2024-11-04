/**
 * @packageDocumentation
 * @module Components/Navigation
 * @preferred
 *
 * @description
 * This module provides the main navigation component for the MyMDB application.
 * It handles user navigation, authentication state, and responsive layout.
 */

import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

/**
 * Main navigation component providing routing and authentication controls.
 * Handles user session management and navigation between different sections
 * of the application.
 *
 * @remarks
 * This component is implemented as a standalone component and uses Angular Material
 * components for styling. It dynamically adjusts its base URL based on the deployment
 * environment and manages user authentication state.
 *
 * @example
 * ```html
 * <app-navigation></app-navigation>
 * ```
 *
 * @public
 * @class
 */
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  /**
   * Dynamic base URL determined by deployment environment.
   * Adjusts paths based on whether the app is deployed under a subdirectory.
   *
   * @readonly
   * @type {string}
   */
  baseUrl = window.location.pathname.includes('mymdb-angular-client')
    ? '/mymdb-angular-client'
    : '';

  /**
   * Path to the application logo, adjusted for the current base URL.
   * Used in the template to display the application logo.
   *
   * @readonly
   * @type {string}
   */
  logoPath = `${this.baseUrl}/assets/mymdb-logo.png`;

  /**
   * Creates an instance of NavigationComponent.
   *
   * @param router - Angular router service for navigation operations
   */
  constructor(private router: Router) {}

  /**
   * Checks if a user is currently logged in by verifying the presence
   * of user credentials in localStorage.
   *
   * @returns {boolean} True if both user data and token exist in localStorage
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }

  /**
   * Determines if the current route is the welcome page.
   * Used to conditionally show/hide the navigation bar.
   *
   * @returns {boolean} True if the current URL matches the welcome page route
   */
  isWelcomePage(): boolean {
    return this.router.url === '/welcome';
  }

  /**
   * Handles user logout process by clearing stored credentials
   * and redirecting to the welcome page.
   *
   * @param {Event} event - Click event to prevent default behavior
   * @throws Will throw an error if navigation fails
   */
  logout(event: Event): void {
    event.preventDefault();
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
