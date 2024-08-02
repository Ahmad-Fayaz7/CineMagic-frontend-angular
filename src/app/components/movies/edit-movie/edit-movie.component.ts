import { Component, OnInit } from '@angular/core';
import { FormMovieComponent } from '../form-movie/form-movie.component';
import { ActivatedRoute } from '@angular/router';
import { movieDto } from '../movie.model';
import { MovieService } from '../movie.service';
import { multipleSelectorModel } from '../../utils/multiple-selector/multiple-selector.model';
import { movieActorDto } from '../../actors/actor.model';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [FormMovieComponent, MaterialModule, CommonModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
})
export class EditMovieComponent {
  constructor(
    private activatedRout: ActivatedRoute,
    private movieService: MovieService
  ) {}

  selectedGenres: multipleSelectorModel[] = [];
  nonSelectedGenres: multipleSelectorModel[] = [];
  selectedMovieTheaters: multipleSelectorModel[] = [];
  nonSelectedMovieTheaters: multipleSelectorModel[] = [];
  selectedActors: movieActorDto[] = [];

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
    this.activatedRout.params.subscribe((params) => {
      this.movieService.getPut(params['id']).subscribe((response) => {
        this.nonSelectedGenres = response.nonSelectedGenres.map((genre) => {
          return <multipleSelectorModel>{ key: genre.id, value: genre.name };
        });

        this.selectedGenres = response.selectedGenres.map((genre) => {
          return <multipleSelectorModel>{ key: genre.id, value: genre.name };
        });

        this.nonSelectedMovieTheaters = response.nonSelectedMovieTheaters.map(
          (movieTheater) => {
            return <multipleSelectorModel>{
              key: movieTheater.id,
              value: movieTheater.name,
            };
          }
        );

        this.selectedMovieTheaters = response.selectedMovieTheaters.map(
          (movieTheater) => {
            return <multipleSelectorModel>{
              key: movieTheater.id,
              value: movieTheater.name,
            };
          }
        );
      });
    });
  }
}
