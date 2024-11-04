/**
 * @packageDocumentation
 * @module Components/Dialog
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Interface defining the structure of genre data passed to the dialog.
 *
 * @interface GenreData
 * @category Interfaces
 */
export interface GenreData {
  /** The name of the genre */
  genre: string;
  /** Detailed description of the genre */
  description: string;
}

/**
 * Modal dialog component that displays information about a movie genre.
 * This component presents detailed information about specific movie genres
 * in a Material dialog format.
 *
 * @remarks
 * This component uses Angular Material's dialog system and is designed to be opened
 * via MatDialog.open(). It expects genre data to be passed through the dialog's
 * data property.
 *
 * @example
 * ```typescript
 * const dialogRef = dialog.open(GenreDialogComponent, {
 *   data: {
 *     genre: 'Science Fiction',
 *     description: 'A genre of speculative fiction...'
 *   }
 * });
 * ```
 *
 * @public
 * @class
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
   * Creates an instance of GenreDialogComponent.
   *
   * @param data - The genre data to be displayed in the dialog
   * @throws Will throw an error if required data properties are missing
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: GenreData
  ) {}
}
