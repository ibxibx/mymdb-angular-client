/**
 * @packageDocumentation
 * @module Services/API
 * @preferred
 *
 * @description
 * This module provides the service responsible for handling all API communications
 * between the MyMDB frontend application and its backend server. It includes
 * methods for user authentication, movie data retrieval, and favorite movie management.
 */
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Base URL for all API endpoints.
 * Points to the deployed backend server.
 *
 * @constant
 * @type {string}
 */
const apiUrl = 'https://mymdb-c295923140ec.herokuapp.com/';

/**
 * Service handling all API communications for the MyMDB application.
 * Provides methods for user management, movie data retrieval, and favorites handling.
 *
 * @remarks
 * This service uses Angular's HttpClient for all API communications and implements
 * error handling and response processing. All methods return Observables and include
 * appropriate error handling.
 *
 * @example
 * ```typescript
 * constructor(private fetchApiData: FetchApiDataService) {
 *   this.fetchApiData.getAllMovies().subscribe(
 *     (movies) => console.log(movies)
 *   );
 * }
 * ```
 *
 * @public
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Creates an instance of FetchApiDataService.
   *
   * @param http - Angular's HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Registers a new user in the system.
   *
   * @param userDetails - Object containing user registration data
   * @returns Observable of the registration response
   * @throws Will throw an error if registration fails
   *
   * @example
   * ```typescript
   * this.service.userRegistration({
   *   Username: 'john_doe',
   *   Password: 'password123',
   *   Email: 'john@example.com'
   * }).subscribe(
   *   (response) => console.log('Registration successful')
   * );
   * ```
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log('Attempting to register user:', userDetails);
    return this.http
      .post(apiUrl + 'users/register', userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Authenticates a user and retrieves access token.
   *
   * @param userDetails - Object containing login credentials
   * @returns Observable of the login response including token
   * @throws Will throw an error if authentication fails
   *
   * @example
   * ```typescript
   * this.service.userLogin({
   *   Username: 'john_doe',
   *   Password: 'password123'
   * }).subscribe(
   *   (response) => console.log('Login successful')
   * );
   * ```
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves all movies from the database.
   * Requires authentication token.
   *
   * @returns Observable of array containing all movies
   * @throws Will throw an error if request fails or unauthorized
   *
   * @example
   * ```typescript
   * this.service.getAllMovies().subscribe(
   *   (movies) => this.movies = movies
   * );
   * ```
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves a single movie by its ID.
   * Requires authentication token.
   *
   * @param movieId - Unique identifier of the movie
   * @returns Observable of the movie details
   * @throws Will throw an error if movie not found or unauthorized
   *
   * @example
   * ```typescript
   * this.service.getOneMovie('movie123').subscribe(
   *   (movie) => this.selectedMovie = movie
   * );
   * ```
   */
  getOneMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves a movie by its title.
   * Requires authentication token.
   *
   * @param title - Title of the movie to fetch
   * @returns Observable of the movie details
   * @throws Will throw an error if movie not found or unauthorized
   *
   * @example
   * ```typescript
   * this.service.getMovieByTitle('Inception').subscribe(
   *   (movie) => this.movieDetails = movie
   * );
   * ```
   */
  getMovieByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/title/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a specific director.
   * Requires authentication token.
   *
   * @param directorName - Name of the director to fetch
   * @returns Observable of the director's details
   * @throws Will throw an error if director not found or unauthorized
   *
   * @example
   * ```typescript
   * this.service.getDirector('Christopher Nolan').subscribe(
   *   (director) => this.directorInfo = director
   * );
   * ```
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a specific genre.
   * Requires authentication token.
   *
   * @param genreName - Name of the genre to fetch
   * @returns Observable of the genre details
   * @throws Will throw an error if genre not found or unauthorized
   *
   * @example
   * ```typescript
   * this.service.getGenre('Action').subscribe(
   *   (genre) => this.genreInfo = genre
   * );
   * ```
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `genres/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves user profile information.
   * Requires authentication token.
   *
   * @param userId - ID of the user to fetch
   * @returns Observable of the user's profile data
   * @throws Will throw an error if user not found or unauthorized
   *
   * @example
   * ```typescript
   * this.service.getUser('user123').subscribe(
   *   (user) => this.userProfile = user
   * );
   * ```
   */
  getUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `user/${userId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves user's favorite movies.
   * Requires authentication token.
   *
   * @param userId - ID of the user whose favorites to fetch
   * @returns Observable of array containing favorite movie IDs
   * @throws Will throw an error if user not found or unauthorized
   *
   * @example
   * ```typescript
   * this.service.getFavoriteMovies('user123').subscribe(
   *   (favorites) => this.userFavorites = favorites
   * );
   * ```
   */
  getFavoriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `user/${userId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map((user: any) => user.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * Adds a movie to user's favorites list.
   * Requires authentication token.
   *
   * @param userId - ID of the user
   * @param movieId - ID of the movie to add to favorites
   * @returns Observable of the updated user profile
   * @throws Will throw an error if operation fails or unauthorized
   *
   * @example
   * ```typescript
   * this.service.addFavoriteMovie('user123', 'movie456').subscribe(
   *   () => console.log('Movie added to favorites')
   * );
   * ```
   */
  addFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(
        apiUrl + `users/${userId}/movies/${movieId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Updates user profile information.
   * Requires authentication token.
   *
   * @param userId - ID of the user to update
   * @param updatedUser - Object containing updated user data
   * @returns Observable of the updated user profile
   * @throws Will throw an error if update fails or unauthorized
   *
   * @example
   * ```typescript
   * this.service.editUser('user123', {
   *   Username: 'new_username',
   *   Email: 'new@email.com'
   * }).subscribe(
   *   (updated) => console.log('Profile updated')
   * );
   * ```
   */
  editUser(userId: string, updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${userId}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes a user account.
   * Requires authentication token.
   *
   * @param userId - ID of the user to delete
   * @returns Observable of the deletion response
   * @throws Will throw an error if deletion fails or unauthorized
   *
   * @example
   * ```typescript
   * this.service.deleteUser('user123').subscribe(
   *   () => console.log('Account deleted')
   * );
   * ```
   */
  deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${userId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Removes a movie from user's favorites list.
   * Requires authentication token.
   *
   * @param userId - ID of the user
   * @param movieId - ID of the movie to remove from favorites
   * @returns Observable of the updated user profile
   * @throws Will throw an error if operation fails or unauthorized
   *
   * @example
   * ```typescript
   * this.service.removeFavoriteMovie('user123', 'movie456').subscribe(
   *   () => console.log('Movie removed from favorites')
   * );
   * ```
   */
  removeFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${userId}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Extracts response data from an HTTP response.
   *
   * @param res - The HTTP response to process
   * @returns The response body or an empty object
   * @internal
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles HTTP errors uniformly across the service.
   *
   * @param error - The HTTP error response to handle
   * @returns Observable error with formatted error message
   * @internal
   *
   * @remarks
   * This method:
   * - Logs errors to console for debugging
   * - Differentiates between client and server errors
   * - Provides user-friendly error messages
   */
  private handleError(error: HttpErrorResponse): any {
    console.error('API Error:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client error:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () =>
        error.error?.message ||
        'Something bad happened; please try again later.'
    );
  }
}
