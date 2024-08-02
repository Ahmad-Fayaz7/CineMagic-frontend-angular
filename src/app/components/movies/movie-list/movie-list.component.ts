import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { movieDto } from '../movie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, GenericListComponent, RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  @Input() movies: any[] = [];

  constructor() {}
}
