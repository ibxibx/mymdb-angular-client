/**
 * @packageDocumentation
 * @module Components/Welcome
 * @preferred
 *
 * @description
 * This module provides the welcome/landing page component implementation.
 * It serves as the entry point of the application, handling user authentication
 * and initial navigation options.
 */

import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NavigationComponent } from '../navigation/navigation.component';

/**
 * Component that represents the welcome/landing page of the application.
 * Provides user registration, login, and movie access functionality through
 * dialog interfaces.
 *
 * @remarks
 * This component serves as the main entry point of the application and is
 * responsible for directing users to either authenticate or access movie content.
 * It uses Material Dialog components for user interactions.
 *
 * @example
 * ```html
 * <app-welcome-page></app-welcome-page>
 * ```
 *
 * @public
 * @class
 * @implements {OnInit}
 */
@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    RouterOutlet,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    NavigationComponent,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of WelcomePageComponent.
   *
   * @param dialog - Material Dialog service for opening modal dialogs
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Currently empty but available for future initialization needs.
   *
   * @memberof WelcomePageComponent
   */
  ngOnInit(): void {}

  /**
   * Opens the user registration dialog.
   * Configures dialog with specific dimensions and behavior settings.
   *
   * @memberof WelcomePageComponent
   * @returns {void}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
      autoFocus: true,
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
    });
  }

  /**
   * Opens the user login dialog.
   * Configures dialog with specific dimensions and behavior settings.
   *
   * @memberof WelcomePageComponent
   * @returns {void}
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
      autoFocus: true,
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
    });
  }

  /**
   * Opens a dialog prompting users to authenticate before accessing movies.
   * Shows a message explaining the need to log in or sign up.
   *
   * @memberof WelcomePageComponent
   * @returns {void}
   */
  openMoviesDialog(): void {
    const dialogRef = this.dialog.open(LoginPromptDialog, {
      width: '300px',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true,
    });
  }
}

/**
 * Dialog component that prompts users to authenticate before viewing movies.
 * Provides a simple message and confirmation button.
 *
 * @remarks
 * This is a standalone component that appears as a modal dialog when
 * unauthenticated users attempt to access movie content.
 *
 * @example
 * ```typescript
 * const dialogRef = dialog.open(LoginPromptDialog, {
 *   width: '300px'
 * });
 * ```
 *
 * @public
 * @class
 */
@Component({
  selector: 'login-prompt-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div style="padding: 24px;">
      <div
        class="mat-dialog-title"
        style="font-weight: bold; margin-bottom: 16px;"
      >
        Access Required
      </div>
      <div class="mat-dialog-content" style="margin-bottom: 24px;">
        Please log in or sign up in order to view the movies
      </div>
      <div class="mat-dialog-actions" align="end">
        <button mat-button (click)="dialogRef.close()">OK</button>
      </div>
    </div>
  `,
})
export class LoginPromptDialog {
  /**
   * Creates an instance of LoginPromptDialog.
   *
   * @param dialogRef - Reference to the dialog instance for closing operations
   */
  constructor(public dialogRef: MatDialogRef<LoginPromptDialog>) {}
}
