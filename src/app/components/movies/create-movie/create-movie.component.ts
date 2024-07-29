import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { FormMovieComponent } from '../form-movie/form-movie.component';
import { movieCreationDto } from '../movie.model';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [RouterLink, MaterialModule, FormMovieComponent],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css',
})
export class CreateMovieComponent {
  model!: movieCreationDto;
  handleSentMovie(movie: movieCreationDto) {
    this.model = movie;
    console.log(movie);
  }
}
