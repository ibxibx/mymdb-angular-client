/**
 * @fileoverview Main application component implementation
 * @module AppComponent
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

/**
 * @class AppComponent
 * @description Root component of the application
 * @extends {Component}
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /** @property {string} title - The application title */
  title = 'MyMDB-Angular-client';

  /**
   * @method isLoggedIn
   * @description Checks if a user is currently logged in
   * @returns {boolean} True if user is logged in
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }

  /**
   * @method logout
   * @description Logs out the current user and redirects to welcome page
   * @returns {void}
   */
  logout(): void {
    localStorage.clear();
    window.location.href = '/welcome';
  }
}
