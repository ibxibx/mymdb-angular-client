/**
 * @packageDocumentation
 * @module Components/MovieCard
 * @preferred
 *
 * @description
 * This module provides the movie card component implementation, which is responsible
 * for displaying and managing movie information in a grid layout. It includes
 * functionality for viewing movie details, managing favorites, and displaying
 * various dialogs for additional information.
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
 * Represents a movie director's information.
 *
 * @interface Director
 * @category Interfaces
 */
export interface Director {
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
 * Represents a movie genre with its description.
 *
 * @interface Genre
 * @category Interfaces
 */
export interface Genre {
  /** Name of the genre */
  genre: string;
  /** Description of the genre */
  description: string;
}

/**
 * Represents a complete movie entry with all its associated details.
 *
 * @interface Movie
 * @category Interfaces
 */
export interface Movie {
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
 * Component responsible for displaying movie information in a card format and
 * handling user interactions with movies.
 *
 * @remarks
 * This component provides a grid layout of movie cards, each showing basic movie
 * information and allowing users to:
 * - View detailed movie information
 * - Add/remove movies from their favorites
 * - View director information
 * - View genre information
 * - View movie synopsis
 *
 * @example
 * ```html
 * <app-movie-card></app-movie-card>
 * ```
 *
 * @public
 * @class
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
  /** Array containing all movies to be displayed */
  movies: Movie[] = [];

  /** Array of movie IDs that the current user has marked as favorites */
  favorites: string[] = [];

  /** Current user data stored in the component */
  user: any;

  /**
   * Creates an instance of MovieCardComponent.
   *
   * @param fetchApiData - Service for making API calls
   * @param dialog - Service for displaying Material dialogs
   * @param snackBar - Service for showing notification messages
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Fetches initial movie data and user favorites.
   *
   * @memberof MovieCardComponent
   */
  ngOnInit(): void {
    this.getMovies();
    this.loadUserData();
  }

  /**
   * Retrieves user data from localStorage and loads their favorite movies.
   *
   * @memberof MovieCardComponent
   * @throws {Error} If user data cannot be parsed from localStorage
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
   * Retrieves all movies from the API and updates the component's movie list.
   *
   * @memberof MovieCardComponent
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: Movie[]) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Opens a dialog displaying information about a specific genre.
   *
   * @param genre - The genre information to display
   * @memberof MovieCardComponent
   */
  openGenreDialog(genre: Genre): void {
    this.dialog.open(GenreDialogComponent, {
      width: '400px',
      data: genre,
    });
  }

  /**
   * Opens a dialog displaying information about a movie director.
   *
   * @param director - The director information to display
   * @memberof MovieCardComponent
   */
  openDirectorDialog(director: Director): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '400px',
      data: director,
    });
  }

  /**
   * Opens a dialog displaying the movie's synopsis and cast information.
   *
   * @param movie - The movie information to display
   * @memberof MovieCardComponent
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
   * Checks if a specific movie is in the user's favorites list.
   *
   * @param movieId - The ID of the movie to check
   * @returns True if the movie is in the user's favorites, false otherwise
   * @memberof MovieCardComponent
   */
  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  /**
   * Toggles the favorite status of a movie for the current user.
   * Adds or removes the movie from the user's favorites list and updates the UI.
   *
   * @param movieId - The ID of the movie to toggle
   * @memberof MovieCardComponent
   * @throws {Error} If user is not logged in or if API call fails
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
