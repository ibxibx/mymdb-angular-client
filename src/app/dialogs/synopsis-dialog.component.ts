/**
 * @fileoverview Movie synopsis dialog component implementation
 * @module SynopsisDialog
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * @interface SynopsisData
 * @description Interface defining the structure of synopsis data passed to the dialog
 */
interface SynopsisData {
  /** The title of the movie */
  title: string;
  /** The movie's synopsis */
  description: string;
  /** Array of actor names in the movie */
  actors: string[];
}

/**
 * @class SynopsisDialogComponent
 * @description Modal dialog component that displays a movie's synopsis and cast information
 * @extends {Component}
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
   * @constructor
   * @param {SynopsisData} data - The movie synopsis data to be displayed in the dialog
   * @description Initializes the dialog with injected synopsis data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: SynopsisData
  ) {}
}
