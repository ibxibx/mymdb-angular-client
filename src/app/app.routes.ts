import { Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent }, 
  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];
