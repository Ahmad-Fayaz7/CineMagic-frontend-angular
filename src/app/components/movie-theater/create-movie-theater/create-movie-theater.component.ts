import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { FormMovieTheaterComponent } from '../form-movie-theater/form-movie-theater.component';
import { MovieTheaterService } from '../movie-theater.service';
import { movieTheaterCreationDto } from '../movie-theater.model';

@Component({
  selector: 'app-create-movie-theater',
  standalone: true,
  imports: [RouterLink, MaterialModule, FormMovieTheaterComponent],
  templateUrl: './create-movie-theater.component.html',
  styleUrl: './create-movie-theater.component.css',
})
export class CreateMovieTheaterComponent {
  constructor(
    private movieTheaterService: MovieTheaterService,
    private router: Router
  ) {}

  saveChanges(movieTheaterCreationDto: movieTheaterCreationDto) {
    this.movieTheaterService
      .create(movieTheaterCreationDto)
      .subscribe(() => this.router.navigate(['/movietheaters']));
  }
}
