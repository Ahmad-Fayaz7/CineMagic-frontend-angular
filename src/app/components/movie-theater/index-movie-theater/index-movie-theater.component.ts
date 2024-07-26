import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { MovieTheaterService } from '../movie-theater.service';
import { movieTheaterDto } from '../movie-theater.model';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';

@Component({
  selector: 'app-index-movie-theater',
  standalone: true,
  imports: [RouterLink, MaterialModule, GenericListComponent],
  templateUrl: './index-movie-theater.component.html',
  styleUrl: './index-movie-theater.component.css',
})
export class IndexMovieTheaterComponent {
  movieTheaters: movieTheaterDto[] = [];
  columnsToDisplay = ['name', 'actions'];
  constructor(private movieTheaterService: MovieTheaterService) {}
  ngOnInit() {
    this.movieTheaterService.get().subscribe((data) => {
      console.log(data);
      this.movieTheaters = data;
    });
  }

  delete(id: number) {}
}
