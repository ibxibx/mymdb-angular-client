/**
 * @fileoverview Director information dialog component implementation
 * @module DirectorDialog
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * @interface DirectorData
 * @description Interface defining the structure of director data passed to the dialog
 */
interface DirectorData {
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
 * @class DirectorDialogComponent
 * @description Modal dialog component that displays detailed information about a movie director
 * @extends {Component}
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
   * @constructor
   * @param {DirectorData} data - The director data to be displayed in the dialog
   * @description Initializes the dialog with injected director data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DirectorData
  ) {}
}
