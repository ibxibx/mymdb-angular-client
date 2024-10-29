import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NavigationComponent,
  ],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  editMode: boolean = false;
  updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * @constructor
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * @method getUser
   * @description Fetches the current user's data from the API
   */
  getUser(): void {
    // Get the user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id;

    if (!userId) {
      this.snackBar.open('User ID not found. Please login again.', 'OK', {
        duration: 2000,
      });
      this.router.navigate(['/welcome']);
      return;
    }

    this.fetchApiData.getUser(userId).subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser = {
        Username: this.user.Username,
        Password: '',
        Email: this.user.Email,
        Birthday: this.user.Birthday,
      };
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  /**
   * @method updateUser
   * @description Updates the user's profile information
   */
  updateUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id;

    if (!userId) {
      this.snackBar.open('User ID not found. Please login again.', 'OK', {
        duration: 2000,
      });
      this.router.navigate(['/welcome']);
      return;
    }

    this.fetchApiData.editUser(userId, this.updatedUser).subscribe({
      next: (result) => {
        this.user = result;
        localStorage.setItem('user', JSON.stringify(result));
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
        this.editMode = false;
      },
      error: (error) => {
        this.snackBar.open(error.message, 'OK', {
          duration: 2000,
        });
      },
    });
  }

  /**
   * @method deleteAccount
   * @description Deletes the user's account
   */
  deleteAccount(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This cannot be undone.'
      )
    ) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user._id;

      if (!userId) {
        this.snackBar.open('User ID not found. Please login again.', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/welcome']);
        return;
      }

      this.fetchApiData.deleteUser(userId).subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/welcome']);
          this.snackBar.open('Account deleted successfully!', 'OK', {
            duration: 2000,
          });
        },
        error: (error) => {
          this.snackBar.open(error.message, 'OK', {
            duration: 2000,
          });
        },
      });
    }
  }
}
