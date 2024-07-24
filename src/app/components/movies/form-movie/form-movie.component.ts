import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { movieCreationDto } from '../movie.model';

@Component({
  selector: 'app-form-movie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule, RouterLink],
  templateUrl: './form-movie.component.html',
  styleUrl: './form-movie.component.css',
})
export class FormMovieComponent {
  movieForm: FormGroup;
  movie: movieCreationDto | undefined;
  @Output() dataEmitter: EventEmitter<movieCreationDto> =
    new EventEmitter<movieCreationDto>();
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.movieForm = formBuilder.group({
      title: ['', [Validators.required]],
      poster: '',
      releaseDate: '',
      price: '',
    });
  }

  saveChanges() {
    this.movie = this.movieForm.value;
    this.dataEmitter.emit(this.movie);
    this.router.navigate(['']);
  }
  getErrorMessageForTitle() {
    const field = this.movieForm.get('title');
    if (field?.hasError('required')) {
      return 'The title field is required';
    }
    return '';
  }
}
