import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { RouterLink } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-filter-movie',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    RouterLink,
    CommonModule,
    MovieListComponent,
  ],
  templateUrl: './filter-movie.component.html',
  styleUrl: './filter-movie.component.css',
})
export class FilterMovieComponent {
  movieFilterForm;
  genres = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Comedy' },
  ];
  movies = [
    {
      title: 'Spider-man',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
      price: 14,
    },
    {
      title: 'Moana',
      poster:
        'https://m.media-amazon.com/images/I/71RgCh-pLWL._AC_UF894,1000_QL80_.jpg',
      price: 14,
    },
    {
      title: 'Shrek',
      poster:
        'https://e00-elmundo.uecdn.es/television/programacion-tv/img/v2/programas/87/504967.png',
      price: 14,
    },
    {
      title: 'Titanic',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
      price: 14,
    },
    {
      title: 'Incepiton',
      poster:
        'https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg',
      price: 14,
    },
  ];

  originalMovies = this.movies;
  filterMovies(values: any) {
    if (values.title) {
      this.movies = this.movies.filter(
        (movie) => movie.title.indexOf(values.title) !== -1
      );
    }
  }

  clearForm() {
    this.movieFilterForm.reset();
  }
  constructor(private formBuilder: FormBuilder) {
    this.movieFilterForm = this.formBuilder.group({
      title: ['', Validators.required],
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false,
    });
    this.movieFilterForm.valueChanges.subscribe((values) => {
      this.movies = this.originalMovies;
      this.filterMovies(values);
    });
  }
}
