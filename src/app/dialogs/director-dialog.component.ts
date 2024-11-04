/**
 * @packageDocumentation
 * @module Components/Dialog
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Interface defining the structure of director data passed to the dialog.
 *
 * @interface DirectorData
 * @category Interfaces
 */
export interface DirectorData {
  /** The director's full name */
  name: string;
  /** Biography of the director */
  bio: string;
  /** Place where the director was born */
  birthPlace: string;
  /** Number of movies directed */
  moviesCount: number;
}

/**
 * Modal dialog component that displays detailed information about a movie director.
 * This component is responsible for rendering director information in a Material dialog.
 *
 * @remarks
 * This component uses Angular Material's dialog system and is designed to be opened
 * via MatDialog.open(). It expects director data to be passed through the dialog's
 * data property.
 *
 * @example
 * ```typescript
 * const dialogRef = dialog.open(DirectorDialogComponent, {
 *   data: {
 *     name: 'Christopher Nolan',
 *     bio: 'British-American film director...',
 *     birthPlace: 'London, England',
 *     moviesCount: 11
 *   }
 * });
 * ```
 *
 * @public
 * @class
 */
@Component({
  selector: 'app-director-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>{{ data.name }}</h2>
      <mat-dialog-content class="dialog-content">
        <p class="info-line">
          <strong>Birth Place:</strong> {{ data.birthPlace }}
        </p>
        <p class="info-line">
          <strong>Movies Directed:</strong> {{ data.moviesCount }}
        </p>
        <p class="bio">{{ data.bio }}</p>
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
      .info-line {
        margin: 16px 0;
      }
      .bio {
        margin-top: 24px;
      }
    `,
  ],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export default class DirectorDialogComponent {
  /**
   * Creates an instance of DirectorDialogComponent.
   *
   * @param data - The director data to be displayed in the dialog
   * @throws Will throw an error if required data properties are missing
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DirectorData
  ) {}
}
