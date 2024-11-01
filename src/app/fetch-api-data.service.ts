/**
 * @fileoverview Service for handling API requests to the MyMDB backend
 * @module FetchApiDataService
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

/** @constant {string} apiUrl - Base URL for the API endpoints */
const apiUrl = 'https://mymdb-c295923140ec.herokuapp.com/';

/**
 * @class FetchApiDataService
 * @description Service class handling all API communications for the MyMDB application
 * @injectable
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * @constructor
   * @param {HttpClient} http - Angular's HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * @method userRegistration
   * @description Registers a new user
   * @param {any} userDetails - User registration details
   * @returns {Observable<any>} Observable of the registration response
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
   * @method userLogin
   * @description Authenticates a user
   * @param {any} userDetails - User login credentials
   * @returns {Observable<any>} Observable of the login response
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
   * @method getAllMovies
   * @description Fetches all movies from the database
   * @returns {Observable<any>} Observable of movies array
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
   * @method getOneMovie
   * @description Fetches a single movie by ID
   * @param {string} movieId - ID of the movie to fetch
   * @returns {Observable<any>} Observable of movie details
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
   * @method getMovieByTitle
   * @description Fetches a movie by its title
   * @param {string} title - Title of the movie to fetch
   * @returns {Observable<any>} Observable of movie details
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
   * @method getDirector
   * @description Fetches director information
   * @param {string} directorName - Name of the director to fetch
   * @returns {Observable<any>} Observable of director details
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
   * @method getGenre
   * @description Fetches genre information
   * @param {string} genreName - Name of the genre to fetch
   * @returns {Observable<any>} Observable of genre details
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
   * @method getUser
   * @description Fetches user information
   * @param {string} userId - ID of the user to fetch
   * @returns {Observable<any>} Observable of user details
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
   * @method getFavoriteMovies
   * @description Fetches user's favorite movies
   * @param {string} userId - ID of the user whose favorites to fetch
   * @returns {Observable<any>} Observable of favorite movies array
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
   * @method addFavoriteMovie
   * @description Adds a movie to user's favorites
   * @param {string} userId - ID of the user
   * @param {string} movieId - ID of the movie to add
   * @returns {Observable<any>} Observable of the updated user profile
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
   * @method editUser
   * @description Updates user information
   * @param {string} userId - ID of the user to update
   * @param {any} updatedUser - Updated user data
   * @returns {Observable<any>} Observable of the updated user profile
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
   * @method deleteUser
   * @description Deletes a user account
   * @param {string} userId - ID of the user to delete
   * @returns {Observable<any>} Observable of deletion confirmation
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
   * @method removeFavoriteMovie
   * @description Removes a movie from user's favorites
   * @param {string} userId - ID of the user
   * @param {string} movieId - ID of the movie to remove
   * @returns {Observable<any>} Observable of the updated user profile
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
   * @method extractResponseData
   * @private
   * @description Extracts the response data from an HTTP response
   * @param {any} res - The HTTP response
   * @returns {any} The response body or an empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * @method handleError
   * @private
   * @description Handles HTTP errors
   * @param {HttpErrorResponse} error - The HTTP error response
   * @returns {Observable<never>} An observable error with the error message
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
