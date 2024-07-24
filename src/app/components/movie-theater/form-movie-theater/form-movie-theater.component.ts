import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { Router, RouterLink } from '@angular/router';
import { MapComponent } from '../../utils/map/map.component';
import { mapCoordinates } from '../../utils/map/coordinate';
import {
  movieTheaterCreationDto,
  movieTheaterDto,
} from '../movie-theater.model';
import { movieCreationDto } from '../../movies/movie.model';

@Component({
  selector: 'app-form-movie-theater',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    RouterLink,
    MapComponent,
  ],
  templateUrl: './form-movie-theater.component.html',
  styleUrl: './form-movie-theater.component.css',
})
export class FormMovieTheaterComponent {
  movieTheaterForm!: FormGroup;
  @Input()
  model!: movieTheaterDto;
  initialcoordinates: mapCoordinates[] = [];

  @Output() onSaveChanges = new EventEmitter<movieTheaterCreationDto>();

  constructor(private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.movieTheaterForm = this.formBuilder.group({
      name: ['', Validators['required']],
      latitude: ['', Validators['required']],
      longitude: ['', Validators['required']],
    });

    if (this.model !== undefined) {
      this.movieTheaterForm.patchValue(this.model);
      this.initialcoordinates.push({
        latitude: this.model.latitude,
        longitude: this.model.longitude,
      });
    }
  }

  selectLocation(mapCoordinates: mapCoordinates) {
    this.movieTheaterForm.patchValue(mapCoordinates);
    console.log(mapCoordinates);
  }
  saveChanges() {
    console.log(this.movieTheaterForm.value);
    this.model = this.movieTheaterForm.value;
    this.onSaveChanges.emit(this.movieTheaterForm.value);
  }
}
