/**
 * @fileoverview Component for handling navigation and user authentication state
 * @module Navigation
 *  @since 1.0.0 - Optional
 */

import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

/**
 * @class NavigationComponent
 * @description Main navigation component providing routing and authentication controls
 * @selector app-navigation
 * @standalone
 * @implements {OnInit} - Optional
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
   * @property {string} baseUrl
   * @description Dynamic base URL determined by deployment environment
   */
  baseUrl = window.location.pathname.includes('mymdb-angular-client')
    ? '/mymdb-angular-client'
    : '';

  /**
   * @property {string} logoPath
   * @description Path to the application logo, adjusted for base URL
   */
  logoPath = `${this.baseUrl}/assets/mymdb-logo.png`;

  /**
   * @constructor
   * @param {Router} router - Angular router service for navigation
   */
  constructor(private router: Router) {}

  /**
   * @method isLoggedIn
   * @description Checks if user is currently logged in
   * @returns {boolean} True if user is logged in
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }

  /**
   * @method isWelcomePage
   * @description Checks if current route is the welcome page
   * @returns {boolean} True if current page is welcome page
   */
  isWelcomePage(): boolean {
    return this.router.url === '/welcome';
  }

  /**
   * @method logout
   * @description Handles user logout by clearing storage and redirecting
   * @param {Event} event - Click event
   * @returns {void}
   */
  logout(event: Event): void {
    event.preventDefault();
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
