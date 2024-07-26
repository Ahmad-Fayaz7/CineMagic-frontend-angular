import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { MovieTheaterService } from '../movie-theater.service';
import { movieTheaterDto } from '../movie-theater.model';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { SweetAlertService } from '../../../utilities/sweet-alert/sweet-alret.service';

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
  constructor(
    private movieTheaterService: MovieTheaterService,
    private sweetAlertService: SweetAlertService
  ) {}
  ngOnInit() {
    this.loadMovieTheaters();
  }

  loadMovieTheaters() {
    this.movieTheaterService.get().subscribe((data) => {
      this.movieTheaters = data;
    });
  }

  async showConfirmation(id: number) {
    const result = await this.sweetAlertService.confirm(
      'Are you sure?',
      'You will not be able to recover this movie theater!'
    );
    if (result.isConfirmed) {
      // Perform the action
      console.log('Confirmed');
      this.movieTheaterService
        .delete(id)
        .subscribe(() => this.loadMovieTheaters());
    } else if (result.isDismissed) {
      console.log('Cancelled');
    }
  }
}
