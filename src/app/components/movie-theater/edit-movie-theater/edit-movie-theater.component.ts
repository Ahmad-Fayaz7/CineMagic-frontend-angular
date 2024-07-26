import { Component } from '@angular/core';
import {
  movieTheaterCreationDto,
  movieTheaterDto,
} from '../movie-theater.model';
import { FormMovieTheaterComponent } from '../form-movie-theater/form-movie-theater.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieTheaterService } from '../movie-theater.service';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-movie-theater',
  standalone: true,
  imports: [FormMovieTheaterComponent, MaterialModule, CommonModule],
  templateUrl: './edit-movie-theater.component.html',
  styleUrl: './edit-movie-theater.component.css',
})
export class EditMovieTheaterComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieTheaterService: MovieTheaterService,
    private router: Router
  ) {}
  model!: movieTheaterDto;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.movieTheaterService
        .getById(id)
        .subscribe((movieTheater) => (this.model = movieTheater));
    });
  }

  saveChanges(movieTheaterDto: movieTheaterDto) {
    this.movieTheaterService
      .edit(this.model.id, movieTheaterDto)
      .subscribe(() => {
        this.router.navigate(['/movietheaters']);
      });
  }
}
