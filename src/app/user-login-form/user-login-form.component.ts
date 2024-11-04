/**
 * @packageDocumentation
 * @module Components/Auth
 * @preferred
 *
 * @description
 * This module provides the user login form component implementation.
 * It handles user authentication through a material dialog form interface.
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Material UI Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

/**
 * Interface defining the structure of user login credentials.
 *
 * @interface UserData
 * @category Interfaces
 */
export interface UserData {
  /** User's unique username */
  Username: string;

  /** User's account password */
  Password: string;
}

/**
 * Component that provides a login form interface for user authentication.
 * Handles user login process and navigation after successful authentication.
 *
 * @remarks
 * This component is implemented as a standalone component and uses Angular Material
 * components for the form interface. It manages user authentication state and
 * handles form submission and error cases.
 *
 * @example
 * ```typescript
 * const dialogRef = dialog.open(UserLoginFormComponent, {
 *   width: '400px'
 * });
 * ```
 *
 * @public
 * @class
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
  ],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Input property holding the user's login credentials.
   * Two-way bound to form inputs.
   *
   * @public
   * @type {UserData}
   */
  @Input() userData: UserData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   *
   * @param fetchApiData - Service for making authentication API calls
   * @param dialogRef - Reference to the dialog containing this component
   * @param snackBar - Service for displaying notification messages
   * @param router - Angular router service for navigation after login
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Currently empty but available for future initialization needs.
   *
   * @memberof UserLoginFormComponent
   */
  ngOnInit(): void {}

  /**
   * Handles the user login process when the login form is submitted.
   * On successful login:
   * - Stores user data and token in localStorage
   * - Closes the login dialog
   * - Shows success message
   * - Navigates to movies page
   *
   * On failed login:
   * - Shows error message
   * - Logs error to console
   *
   * @memberof UserLoginFormComponent
   * @throws Will throw an error if the login API call fails
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('User logged in successfully!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('Login failed!', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
