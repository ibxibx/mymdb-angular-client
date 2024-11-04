/**
 * @packageDocumentation
 * @module Components/Auth
 * @preferred
 *
 * @description
 * This module provides the user registration form component implementation.
 * It handles new user sign-up functionality with form validation and API integration.
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

/**
 * Interface defining the structure of user registration data.
 *
 * @interface UserRegistrationData
 * @category Interfaces
 */
export interface UserRegistrationData {
  /** User's chosen username */
  Username: string;

  /** User's account password */
  Password: string;

  /** User's email address */
  Email: string;

  /** User's date of birth */
  Birthday: string;
}

/**
 * Component that provides the registration form interface for new users.
 * Handles user registration process including form validation and submission.
 *
 * @remarks
 * This component is implemented as a standalone component and uses Angular Material
 * components for the form interface. It manages form state and handles submission
 * through the API service.
 *
 * @example
 * ```typescript
 * const dialogRef = dialog.open(UserRegistrationFormComponent, {
 *   width: '400px'
 * });
 * ```
 *
 * @public
 * @class
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Input property holding the user registration form data.
   * Two-way bound to form inputs.
   *
   * @public
   * @type {UserRegistrationData}
   */
  @Input() userData: UserRegistrationData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   *
   * @param fetchApiData - Service for making registration API calls
   * @param dialogRef - Reference to the dialog containing this component
   * @param snackBar - Service for displaying notification messages
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Currently empty but available for future initialization needs.
   *
   * @memberof UserRegistrationFormComponent
   */
  ngOnInit(): void {}

  /**
   * Handles the user registration process when the form is submitted.
   * Performs basic validation before making the API call.
   *
   * On successful registration:
   * - Logs success message
   * - Closes the registration dialog
   * - Shows success notification
   *
   * On registration failure:
   * - Logs error details
   * - Shows error notification
   *
   * @memberof UserRegistrationFormComponent
   * @throws Will throw an error if required fields are missing or if API call fails
   */
  registerUser(): void {
    // Basic form validation
    if (
      !this.userData.Username ||
      !this.userData.Password ||
      !this.userData.Email
    ) {
      this.snackBar.open('Please fill in all required fields', 'OK', {
        duration: 2000,
      });
      return;
    }

    // Process registration
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.dialogRef.close();
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.snackBar.open(
          error || 'Registration failed - please try again',
          'OK',
          {
            duration: 2000,
          }
        );
      },
    });
  }
}
