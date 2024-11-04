/**
 * @packageDocumentation
 * @module Components/Dialog
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Interface defining the structure of synopsis data passed to the dialog.
 *
 * @interface SynopsisData
 * @category Interfaces
 */
export interface SynopsisData {
  /** The title of the movie */
  title: string;
  /** The movie's synopsis */
  description: string;
  /** Array of actor names in the movie */
  actors: string[];
}

/**
 * Modal dialog component that displays a movie's synopsis and cast information.
 * This component presents detailed movie information including plot summary and
 * cast list in a Material dialog format.
 *
 * @remarks
 * This component uses Angular Material's dialog system and is designed to be opened
 * via MatDialog.open(). It expects synopsis data to be passed through the dialog's
 * data property.
 *
 * @example
 * ```typescript
 * const dialogRef = dialog.open(SynopsisDialogComponent, {
 *   data: {
 *     title: 'Inception',
 *     description: 'A thief who steals corporate secrets...',
 *     actors: ['Leonardo DiCaprio', 'Ellen Page', 'Tom Hardy']
 *   }
 * });
 * ```
 *
 * @public
 * @class
 */
@Component({
  selector: 'app-synopsis-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <mat-dialog-content class="dialog-content">
        <p class="synopsis">{{ data.description }}</p>
        <p class="cast">
          <strong>Starring:</strong> {{ data.actors.join(', ') }}
        </p>
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
      .synopsis {
        margin-bottom: 24px;
      }
      .cast {
        margin-top: 24px;
        color: #666;
      }
    `,
  ],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export default class SynopsisDialogComponent {
  /**
   * Creates an instance of SynopsisDialogComponent.
   *
   * @param data - The movie synopsis data to be displayed in the dialog
   * @throws Will throw an error if required data properties are missing
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: SynopsisData
  ) {}
}
