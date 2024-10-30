// user-profile.component.ts
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
  user: any = {};
  editMode: boolean = false;
  favoriteMovies: any[] = [];
  updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.loadFavoriteMovies();
  }

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

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

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

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '400px',
      data: genre,
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '400px',
      data: director,
    });
  }

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
