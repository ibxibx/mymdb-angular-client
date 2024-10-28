import { Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';

export const routes: Routes = [
  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];
