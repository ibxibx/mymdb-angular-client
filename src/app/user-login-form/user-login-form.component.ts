/**
 * @fileoverview Component handling user login functionality
 * @module UserLoginForm
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Import Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

/**
 * @interface UserData
 * @description User login credentials structure
 */
interface UserData {
  Username: string;
  Password: string;
}

/**
 * @class UserLoginFormComponent
 * @description Component handling user login form and authentication
 * @implements {OnInit}
 * @selector app-user-login-form
 * @standalone
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
   * @property {UserData} userData
   * @description Holds the user's login credentials
   * @input Binding for form data
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API calls
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog containing this component
   * @param {MatSnackBar} snackBar - Service for showing notifications
   * @param {Router} router - Angular router service for navigation
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after data-bound properties are initialized
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * @method loginUser
   * @description Handles user login process
   * @returns {void}
   * @throws {Error} When login fails
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
