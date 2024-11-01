/**
 * @fileoverview Welcome page component that handles user authentication dialogs and initial navigation
 * @author [Your Name]
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
 * Handles user registration, login, and movie access dialogs.
 *
 * @component
 * @selector app-welcome-page
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
   * @param {MatDialog} dialog - Material Dialog service for opening modal dialogs
   */
  constructor(public dialog: MatDialog) {}
  /** Lifecycle hook that is called after data-bound properties are initialized */
  ngOnInit(): void {}

  /**
   * Opens the user registration dialog with specified configuration
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
   * Opens the user login dialog with specified configuration
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
   * Opens a dialog prompting users to log in before accessing movies
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
 * Dialog component that prompts users to log in or sign up to view movies
 *
 * @component
 * @selector login-prompt-dialog
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
   * @param {MatDialogRef<LoginPromptDialog>} dialogRef - Reference to the dialog instance
   */
  constructor(public dialogRef: MatDialogRef<LoginPromptDialog>) {}
}
