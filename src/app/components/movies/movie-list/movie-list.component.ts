import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { movieDto } from '../movie.model';
import { RouterLink } from '@angular/router';
import { MovieService } from '../movie.service';
import { SweetAlertService } from '../../../utilities/sweet-alert/sweet-alret.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, GenericListComponent, RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  constructor(
    private movieService: MovieService,
    private sweetAlertService: SweetAlertService
  ) {}

  @Input() movies: any[] = [];

  @Output() onDelete = new EventEmitter<void>();

  async showConfirmation(id: number) {
    const result = await this.sweetAlertService.confirm(
      'Are you sure?',
      'You will not be able to recover this movie!'
    );
    if (result.isConfirmed) {
      // Perform the action
      console.log('Confirmed');
      this.movieService.delete(id).subscribe(() => this.onDelete.emit());
    } else if (result.isDismissed) {
      console.log('Cancelled');
    }
  }
}
