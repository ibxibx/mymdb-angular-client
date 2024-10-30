import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      birthPlace: string;
      moviesCount: number;
    }
  ) {}
}
