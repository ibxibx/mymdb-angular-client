/**
 * @packageDocumentation
 * @module Core/App
 * @preferred
 *
 * @description
 * This module provides the root application component implementation.
 * It serves as the main entry point and shell of the application.
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

/**
 * Root component of the MyMDB application.
 * Provides the main application shell and handles top-level authentication state.
 *
 * @remarks
 * This component serves as the application shell and handles basic authentication
 * state management. It's responsible for the global layout and main navigation
 * structure of the application.
 *
 * @example
 * ```html
 * <app-root></app-root>
 * ```
 *
 * @public
 * @class
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /** The title of the application */
  title = 'MyMDB-Angular-client';

  /**
   * Checks if a user is currently logged in by verifying local storage tokens.
   *
   * @returns {boolean} True if both user data and token exist in localStorage
   * @memberof AppComponent
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }

  /**
   * Logs out the current user by clearing local storage and redirecting.
   *
   * @memberof AppComponent
   * @throws Will throw an error if navigation fails
   */
  logout(): void {
    localStorage.clear();
    window.location.href = '/welcome';
  }
}
