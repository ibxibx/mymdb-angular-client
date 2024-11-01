/**
 * @fileoverview Movie card component implementation for displaying movie information
 * @module MovieCard
 */

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

/**
 * @interface Director
 * @description Represents a movie's director information
 */
interface Director {
  /** Director's full name */
  name: string;
  /** Director's biography */
  bio: string;
  /** Director's place of birth */
  birthPlace: string;
  /** Number of movies directed */
  moviesCount: number;
}

/**
 * @interface Genre
 * @description Represents a movie genre with its description
 */
interface Genre {
  /** Name of the genre */
  genre: string;
  /** Description of the genre */
  description: string;
}

/**
 * @interface Movie
 * @description Represents a complete movie entry with all its details
 */
interface Movie {
  /** Unique identifier for the movie */
  _id: string;
  /** Movie title */
  Title: string;
  /** Movie synopsis/description */
  Description: string;
  /** List of actors in the movie */
  Actors: string[];
  /** URL to movie poster image */
  ImagePath: string;
  /** Indicates if movie is featured */
  Featured: boolean;
  /** Director information */
  Director: Director;
  /** List of movie genres */
  Genres: Genre[];
}

/**
 * @class MovieCardComponent
 * @description Component for displaying movie cards and handling user interactions
 * @implements {OnInit}
 */
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
  /**
   * @property {Movie[]} movies
   * @description Array of movies to display
   * @public
   */
  movies: Movie[] = [];

  /**
   * @property {string[]} favorites
   * @description Array of user's favorite movie IDs
   * @public
   */
  favorites: string[] = [];

  /**
   * @property {any} user
   * @description Current user data
   * @public
   */
  user: any;

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API calls
   * @param {MatDialog} dialog - Service for displaying dialogs
   * @param {MatSnackBar} snackBar - Service for showing notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @method ngOnInit
   * @description Initializes component data after creation
   * @returns {void}
   */
  ngOnInit(): void {
    this.getMovies();
    this.loadUserData();
  }

  /**
   * Loads user data and favorites from storage.
   * Retrieves user information from localStorage and fetches their favorite movies.
   */
  loadUserData(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      this.fetchApiData.getFavoriteMovies(this.user._id).subscribe((favs) => {
        this.favorites = favs;
      });
    }
  }

  /**
   * Fetches all movies from the API.
   * Updates the movies array with the retrieved data.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: Movie[]) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Opens a dialog displaying genre information.
   * @param genre The genre information to display
   */
  openGenreDialog(genre: Genre): void {
    this.dialog.open(GenreDialogComponent, {
      width: '400px',
      data: genre,
    });
  }

  /**
   * Opens a dialog displaying director information.
   * @param director The director information to display
   */
  openDirectorDialog(director: Director): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '400px',
      data: director,
    });
  }

  /**
   * Opens a dialog displaying movie synopsis.
   * @param movie The movie information to display
   */
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

  /**
   * Checks if a movie is in user's favorites.
   * @param movieId ID of the movie to check
   * @returns True if the movie is in favorites
   */
  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  /**
   * Toggles a movie's favorite status for the current user.
   * @param movieId ID of the movie to toggle
   */
  toggleFavorite(movieId: string): void {
    if (!this.user) return;

    if (this.isFavorite(movieId)) {
      this.fetchApiData
        .removeFavoriteMovie(this.user._id, movieId)
        .subscribe(() => {
          this.favorites = this.favorites.filter((id) => id !== movieId);
          this.snackBar.open('Removed from favorites', 'OK', {
            duration: 2000,
          });
        });
    } else {
      this.fetchApiData
        .addFavoriteMovie(this.user._id, movieId)
        .subscribe(() => {
          this.favorites.push(movieId);
          this.snackBar.open('Added to favorites', 'OK', { duration: 2000 });
        });
    }
  }
}
