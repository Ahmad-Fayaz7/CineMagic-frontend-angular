import { Component } from '@angular/core';
import { MovieListComponent } from '../movies/movie-list/movie-list.component';
import { MovieService } from '../movies/movie.service';
import { movieDto } from '../movies/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  moviesInTheater: any;
  upcomingMovies: any;

  constructor(private movieService: MovieService) {}
  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getHomePageMovies().subscribe((movies) => {
      this.moviesInTheater = movies.inTheaters;
      this.upcomingMovies = movies.upcomingReleases;
    });
  }

  onDelete() {
    this.loadMovies();
  }
}
