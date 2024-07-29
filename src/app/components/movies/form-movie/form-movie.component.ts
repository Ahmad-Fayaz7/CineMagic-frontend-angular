import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { movieCreationDto, movieDto } from '../movie.model';
import { InputImageComponent } from '../../utils/input-image/input-image.component';
import { InputMarkdownComponent } from '../../utils/input-markdown/input-markdown.component';
import { MultipleSelectorComponent } from '../../utils/multiple-selector/multiple-selector.component';
import { multipleSelectorModel } from '../../utils/multiple-selector/multiple-selector.model';

@Component({
  selector: 'app-form-movie',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    RouterLink,
    InputImageComponent,
    InputMarkdownComponent,
    MultipleSelectorComponent,
  ],
  templateUrl: './form-movie.component.html',
  styleUrl: './form-movie.component.css',
})
export class FormMovieComponent {
  nonSelectedGenres: multipleSelectorModel[] = [
    { key: 1, value: 'Comedy' },
    { key: 2, value: 'Action' },
    { key: 3, value: 'Drama' },
  ];
  selectedGenres: multipleSelectorModel[] = [];

  nonSelectedMovieTheaters: multipleSelectorModel[] = [
    { key: 1, value: 'Yelmo Cines Ideal' },
    { key: 2, value: 'Kinépolis movie city' },
    { key: 3, value: 'Cinesa Proyecciones' },
  ];

  selectedMovieTheaters: multipleSelectorModel[] = [];
  onImageSelected(image: File) {
    this.movieForm.get('poster')?.setValue(image);
  }
  movieForm: FormGroup;
  @Input() model!: movieDto;
  @Output() dataEmitter: EventEmitter<movieCreationDto> =
    new EventEmitter<movieCreationDto>();
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      poster: '',
      summary: '',
      inTheaters: false,
      releaseDate: '',
      trailer: '',
      genreIds: '',
      movieTheaterIds: '',
    });
    if (this.model !== undefined) {
      this.movieForm.patchValue(this.model);
    }
  }

  saveChanges() {
    //this.model = this.movieForm.value;
    const genreIds = this.selectedGenres.map((item) => item.key);
    const movieTheaterIds = this.selectedMovieTheaters.map((item) => item.key);
    this.movieForm.get('genreIds')?.setValue(genreIds);
    this.movieForm.get('movieTheaterIds')?.setValue(movieTheaterIds);
    this.dataEmitter.emit(this.movieForm.value);
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
