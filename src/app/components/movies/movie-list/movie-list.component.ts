import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, GenericListComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  @Input() movies;

  constructor() {
    this.movies = [
      {
        title: 'Spider-man',
        poster:
          'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
        price: 19.4,
      },
      {
        title: 'Moana',
        poster:
          'https://m.media-amazon.com/images/I/71RgCh-pLWL._AC_UF894,1000_QL80_.jpg',
        price: 25,
      },
    ];
  }
}
