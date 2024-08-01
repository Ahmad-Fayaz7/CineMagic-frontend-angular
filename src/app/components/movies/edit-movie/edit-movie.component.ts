import { Component, OnInit } from '@angular/core';
import { FormMovieComponent } from '../form-movie/form-movie.component';
import { ActivatedRoute } from '@angular/router';
import { movieDto } from '../movie.model';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [FormMovieComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
})
export class EditMovieComponent {
  constructor(private activatedRout: ActivatedRoute) {}
  model: movieDto = {
    title: 'titanic',
    poster:
      'https://m.media-amazon.com/images/I/811lT7khIrL._AC_UF894,1000_QL80_.jpg',
    releaseDate: new Date(),
    inTheater: false,
    summary: '',
    trailer: '',
    genres: [],
    movieTheaters: [],
    actors: [],
  };
  ngOnInit(): void {
    this.activatedRout.params.subscribe((params) => {});
  }
}
