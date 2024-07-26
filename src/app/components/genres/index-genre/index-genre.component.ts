import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { RouterLink } from '@angular/router';
import { GenresService } from '../genres.service';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from '../../../utilities/sweet-alert/sweet-alret.service';

@Component({
  selector: 'app-index-genre',
  standalone: true,
  imports: [MaterialModule, RouterLink, CommonModule, GenericListComponent],
  providers: [GenresService],
  templateUrl: './index-genre.component.html',
  styleUrl: './index-genre.component.css',
})
export class IndexGenreComponent {
  genres: any[] = [];
  columnsToDisplay = ['name', 'actions'];
  constructor(
    private genresService: GenresService,
    private sweetAlertService: SweetAlertService
  ) {}
  ngOnInit() {
    this.loadGenres();
  }

  loadGenres() {
    this.genresService.getGenres().subscribe((data) => {
      this.genres = data;
    });
  }

  async showConfirmation(id: number) {
    const result = await this.sweetAlertService.confirm(
      'Are you sure?',
      'You will not be able to recover this genre!'
    );
    if (result.isConfirmed) {
      // Perform the action
      console.log('Confirmed');
      this.genresService.delete(id).subscribe(() => this.loadGenres());
    } else if (result.isDismissed) {
      console.log('Cancelled');
    }
  }
}
