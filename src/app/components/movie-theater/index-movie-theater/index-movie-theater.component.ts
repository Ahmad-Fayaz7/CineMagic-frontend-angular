import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-index-movie-theater',
  standalone: true,
  imports: [RouterLink, MaterialModule],
  templateUrl: './index-movie-theater.component.html',
  styleUrl: './index-movie-theater.component.css',
})
export class IndexMovieTheaterComponent {}
