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
import { ActorAutocompleteComponent } from '../../actors/actor-autocomplete/actor-autocomplete.component';
import { movieActorDto } from '../../actors/actor.model';

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
    ActorAutocompleteComponent,
  ],
  templateUrl: './form-movie.component.html',
  styleUrl: './form-movie.component.css',
})
export class FormMovieComponent {
  // Selected and nonseletected items in the list
  @Input()
  nonSelectedGenres: multipleSelectorModel[] = [];
  @Input()
  selectedGenres: multipleSelectorModel[] = [];
  @Input()
  nonSelectedMovieTheaters: multipleSelectorModel[] = [];
  @Input()
  selectedMovieTheaters: multipleSelectorModel[] = [];
  @Input()
  selectedActors: movieActorDto[] = [];

  movieForm: FormGroup;

  // In Edit receives movieDto
  @Input() model!: movieDto;

  // In Creation sends movieCreationDto
  @Output() dataEmitter: EventEmitter<movieCreationDto> =
    new EventEmitter<movieCreationDto>();

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // Creates the form and its elements
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      poster: '',
      summary: '',
      inTheaters: false,
      releaseDate: '',
      trailer: '',
      genresIds: '',
      movieTheatersIds: '',
      actors: '',
    });
    if (this.model !== undefined) {
      this.movieForm.patchValue(this.model);
    }
  }

  // Sets the value of movie poster
  onImageSelected(image: File) {
    this.movieForm.get('poster')?.setValue(image);
  }

  onMarkdownChange(content: string) {
    this.summary = content;
  }
  summary: string = 'summary';

  // Saves the changes
  saveChanges() {
    const genresIds = this.selectedGenres.map((item) => item.key);
    const movieTheatersIds = this.selectedMovieTheaters.map((item) => item.key);
    const actors = this.selectedActors.map((item) => {
      return { id: item.id, character: item.character };
    });
    this.movieForm.get('actors')?.setValue(actors);
    this.movieForm.get('genresIds')?.setValue(genresIds);
    this.movieForm.get('movieTheatersIds')?.setValue(movieTheatersIds);
    this.movieForm.get('summary')?.setValue(this.summary);
    this.dataEmitter.emit(this.movieForm.value);
  }

  // Returns the error message for movie's title
  getErrorMessageForTitle() {
    const field = this.movieForm.get('title');
    if (field?.hasError('required')) {
      return 'The title field is required';
    }
    return '';
  }
}
