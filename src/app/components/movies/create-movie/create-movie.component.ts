import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { FormMovieComponent } from '../form-movie/form-movie.component';
import { movieCreationDto } from '../movie.model';
import { MovieService } from '../movie.service';
import { multipleSelectorModel } from '../../utils/multiple-selector/multiple-selector.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [RouterLink, MaterialModule, FormMovieComponent, CommonModule],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css',
})
export class CreateMovieComponent {
  model!: movieCreationDto;
  constructor(private movieService: MovieService, private router: Router) {}
  nonSelectedGenres: multipleSelectorModel[] = [];
  nonSelectedMovieTheaters: multipleSelectorModel[] = [];
  ngOnInit() {
    this.movieService.getPost().subscribe((data) => {
      this.nonSelectedGenres = data.genres.map((genre) => {
        return <multipleSelectorModel>{ key: genre.id, value: genre.name };
      });

      this.nonSelectedMovieTheaters = data.movieTheaters.map((movieTheater) => {
        return <multipleSelectorModel>{
          key: movieTheater.id,
          value: movieTheater.name,
        };
      });
    });
  }
  saveChanges(movie: movieCreationDto) {
    this.model = movie;
    console.log(movie);
    this.movieService.create(movie).subscribe();
    this.router.navigate(['']);
  }
}
