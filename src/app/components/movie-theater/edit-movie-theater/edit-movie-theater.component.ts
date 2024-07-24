import { Component } from '@angular/core';
import { movieTheaterCreationDto } from '../movie-theater.model';
import { FormMovieTheaterComponent } from '../form-movie-theater/form-movie-theater.component';

@Component({
  selector: 'app-edit-movie-theater',
  standalone: true,
  imports: [FormMovieTheaterComponent],
  templateUrl: './edit-movie-theater.component.html',
  styleUrl: './edit-movie-theater.component.css',
})
export class EditMovieTheaterComponent {
  model: movieTheaterCreationDto = {
    name: 'Cines Centrofama',
    latitude: 37.99024360175461,
    longitude: 358.87219060042673,
  };

  ngOnInit() {}
}
