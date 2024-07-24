import { Component } from '@angular/core';
import { MovieListComponent } from '../movies/movie-list/movie-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
