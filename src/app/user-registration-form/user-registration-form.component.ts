/**
 * @fileoverview Component for handling new user registration
 * @module UserRegistrationForm
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
 * @interface UserRegistrationData
 * @description Structure for user registration data
 */
interface UserRegistrationData {
  Username: string;
  Password: string;
  Email: string;
  Birthday: string;
}

/**
 * @class UserRegistrationFormComponent
 * @description Component for handling new user registration form and submission
 * @implements {OnInit}
 * @selector app-user-registration-form
 * @standalone
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
   * @property {UserRegistrationData} userData
   * @description Holds the user registration form data
   * @input Binding for form data
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API calls
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog containing this component
   * @param {MatSnackBar} snackBar - Service for showing notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after data-bound properties are initialized
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * @method registerUser
   * @description Handles user registration process including validation
   * @returns {void}
   * @throws {Error} When registration fails or validation fails
   */
  registerUser(): void {
    // Basic validation
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
