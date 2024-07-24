import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { FormGenreComponent } from '../form-genre/form-genre.component';
import { genreCreationDto } from '../genre.model';
import { GenresService } from '../genres.service';
import { DisplayErrorsComponent } from '../../utils/display-errors/display-errors.component';
import { parseWebAPIErros } from '../../utils/utility-functions';

@Component({
  selector: 'app-create-genre',
  standalone: true,
  imports: [
    RouterLink,
    MaterialModule,
    FormGenreComponent,
    DisplayErrorsComponent,
  ],
  templateUrl: './create-genre.component.html',
  styleUrl: './create-genre.component.css',
})
export class CreateGenreComponent {
  constructor(private genresService: GenresService, private router: Router) {}
  erros: string[] = [];
  saveChanges(genreCreationDto: genreCreationDto) {
    this.genresService.create(genreCreationDto).subscribe(
      () => {
        this.router.navigate(['/genres']);
      },
      (error) => (this.erros = parseWebAPIErros(error))
    );
  }
}
