import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    RouterOutlet,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    NavigationComponent,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
      autoFocus: true,
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
      autoFocus: true,
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
    });
  }

  openMoviesDialog(): void {
    const dialogRef = this.dialog.open(LoginPromptDialog, {
      width: '300px',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true,
    });
  }
}

@Component({
  selector: 'login-prompt-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div style="padding: 24px;">
      <div
        class="mat-dialog-title"
        style="font-weight: bold; margin-bottom: 16px;"
      >
        Access Required
      </div>
      <div class="mat-dialog-content" style="margin-bottom: 24px;">
        Please log in or sign up in order to view the movies
      </div>
      <div class="mat-dialog-actions" align="end">
        <button mat-button (click)="dialogRef.close()">OK</button>
      </div>
    </div>
  `,
})
export class LoginPromptDialog {
  constructor(public dialogRef: MatDialogRef<LoginPromptDialog>) {}
}
