import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  logoPath = 'assets/mymdb-logo.png';

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }

  isWelcomePage(): boolean {
    return this.router.url === '/welcome';
  }

  logout(event: Event): void {
    event.preventDefault();
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
