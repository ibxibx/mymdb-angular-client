import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationComponent } from '../navigation/navigation.component';
import GenreDialogComponent from '../dialogs/genre-dialog.component';
import DirectorDialogComponent from '../dialogs/director-dialog.component';
import SynopsisDialogComponent from '../dialogs/synopsis-dialog.component';

interface Movie {
  _id: string;
  Title: string;
  Description: string;
  Actors: string[];
  ImagePath: string;
  Featured: boolean;
  Director: {
    name: string;
    bio: string;
    birthPlace: string;
    moviesCount: number;
  };
  Genres: Array<{
    genre: string;
    description: string;
  }>;
}

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NavigationComponent,
    GenreDialogComponent,
    DirectorDialogComponent,
    SynopsisDialogComponent,
  ],
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];
  favorites: string[] = [];
  user: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.loadUserData();
  }

  loadUserData(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      // Load user's favorites
      this.fetchApiData.getFavoriteMovies(this.user._id).subscribe((favs) => {
        this.favorites = favs;
      });
    }
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: Movie[]) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openGenreDialog(genre: { genre: string; description: string }): void {
    this.dialog.open(GenreDialogComponent, {
      width: '400px',
      data: genre,
    });
  }

  openDirectorDialog(director: {
    name: string;
    bio: string;
    birthPlace: string;
    moviesCount: number;
  }): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '400px',
      data: director,
    });
  }

  openSynopsisDialog(movie: Movie): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '400px',
      data: {
        title: movie.Title,
        description: movie.Description,
        actors: movie.Actors,
      },
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (!this.user) return;

    if (this.isFavorite(movieId)) {
      // Remove from favorites
      this.fetchApiData
        .removeFavoriteMovie(this.user._id, movieId)
        .subscribe(() => {
          this.favorites = this.favorites.filter((id) => id !== movieId);
          this.snackBar.open('Removed from favorites', 'OK', {
            duration: 2000,
          });
        });
    } else {
      // Add to favorites
      this.fetchApiData
        .addFavoriteMovie(this.user._id, movieId)
        .subscribe(() => {
          this.favorites.push(movieId);
          this.snackBar.open('Added to favorites', 'OK', { duration: 2000 });
        });
    }
  }
}
