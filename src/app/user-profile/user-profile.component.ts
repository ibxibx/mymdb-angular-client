/**
 * @fileoverview Component for managing user profile information and favorite movies
 * @module UserProfile
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';
import GenreDialogComponent from '../dialogs/genre-dialog.component';
import DirectorDialogComponent from '../dialogs/director-dialog.component';
import SynopsisDialogComponent from '../dialogs/synopsis-dialog.component';

/**
 * @interface User
 * @description User profile data structure
 */
interface User {
  _id?: string;
  Username: string;
  Password: string;
  Email: string;
  Birthday: string;
}

/**
 * @class UserProfileComponent
 * @description Component for displaying and managing user profile and favorite movies
 * @implements {OnInit}
 * @selector app-user-profile
 * @standalone
 */

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
    MatIconModule,
    FormsModule,
    NavigationComponent,
    GenreDialogComponent,
    DirectorDialogComponent,
    SynopsisDialogComponent,
  ],
})
export class UserProfileComponent implements OnInit {
  /** @property {User} user - Current user's profile data */
  user: any = {};
  /** @property {boolean} editMode - Controls profile edit mode visibility */
  editMode: boolean = false;
  /** @property {Array<any>} favoriteMovies - User's favorite movies list */
  favoriteMovies: any[] = [];
  /** @property {User} updatedUser - Temporary storage for profile updates */
  updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API calls
   * @param {MatDialog} dialog - Service for dialog windows
   * @param {MatSnackBar} snackBar - Service for notifications
   * @param {Router} router - Angular router service
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * @method ngOnInit
   * @description Initializes component by loading user data and favorites
   * @returns {void}
   */
  ngOnInit(): void {
    this.getUser();
    this.loadFavoriteMovies();
  }

  /**
   * @method getUser
   * @description Fetches current user's profile data
   * @returns {void}
   * @throws {Error} When user ID is not found
   */
  getUser(): void {
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

  /**
   * @method loadFavoriteMovies
   * @description Loads user's favorite movies list
   * @returns {void}
   */
  loadFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user._id) {
      // First get the user's favorite movie IDs
      this.fetchApiData.getFavoriteMovies(user._id).subscribe((favoriteIds) => {
        // Then get all movies
        this.fetchApiData.getAllMovies().subscribe((movies) => {
          // Filter movies to only include favorites
          this.favoriteMovies = movies.filter((movie: any) =>
            favoriteIds.includes(movie._id)
          );
        });
      });
    }
  }

  /**
   * @method toggleEditMode
   * @description Toggles profile edit mode
   * @returns {void}
   */
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  /**
   * @method updateUser
   * @description Updates user profile information
   * @returns {void}
   * @throws {Error} When update fails
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
   * @description Handles user account deletion
   * @returns {void}
   * @throws {Error} When deletion fails
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

  /**
   * @method removeFavorite
   * @description Removes a movie from user's favorites
   * @param {string} movieId - ID of movie to remove
   * @returns {void}
   */
  removeFavorite(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user._id) {
      this.fetchApiData.removeFavoriteMovie(user._id, movieId).subscribe(() => {
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000,
        });
        this.loadFavoriteMovies(); // Reload the favorites list
      });
    }
  }

  /**
   * @method openGenreDialog
   * @description Opens dialog with genre information
   * @param {any} genre - Genre data to display
   * @returns {void}
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '400px',
      data: genre,
    });
  }

  /**
   * @method openDirectorDialog
   * @description Opens dialog with director information
   * @param {any} genre - Director data to display
   * @returns {void}
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '400px',
      data: director,
    });
  }

  /**
   * @method openSynopsisDialog
   * @description Opens dialog with synopsis information
   * @param {any} genre - Synopsis data to display
   * @returns {void}
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '400px',
      data: {
        title: movie.Title,
        description: movie.Description,
        actors: movie.Actors,
      },
    });
  }
}
