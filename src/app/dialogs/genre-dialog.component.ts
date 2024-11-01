/**
 * @fileoverview Genre information dialog component implementation
 * @module GenreDialog
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * @interface GenreData
 * @description Interface defining the structure of genre data passed to the dialog
 */
interface GenreData {
  /** The name of the genre */
  genre: string;
  /** Detailed description of the genre */
  description: string;
}

/**
 * @class GenreDialogComponent
 * @description Modal dialog component that displays information about a movie genre
 * @extends {Component}
 */
@Component({
  selector: 'app-genre-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>{{ data.genre }}</h2>
      <mat-dialog-content class="dialog-content">
        <p>{{ data.description }}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 24px;
      }
      .dialog-content {
        margin: 24px 0;
        line-height: 1.6;
      }
      h2 {
        margin: 0;
        font-size: 24px;
        color: #333;
      }
    `,
  ],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export default class GenreDialogComponent {
  /**
   * @constructor
   * @param {GenreData} data - The genre data to be displayed in the dialog
   * @description Initializes the dialog with injected genre data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: GenreData
  ) {}
}
