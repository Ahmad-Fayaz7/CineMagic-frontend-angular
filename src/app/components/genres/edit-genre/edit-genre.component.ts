import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components
import { FormGenreComponent } from '../form-genre/form-genre.component';
import { genreCreationDto, genreDto } from '../genre.model';
import { GenresService } from '../genres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [CommonModule, FormGenreComponent, MaterialModule],
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css'],
})
export class EditGenreComponent {
  model!: genreDto;

  constructor(
    private genresService: GenresService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.genresService.getById(params['id']).subscribe((genre) => {
        this.model = genre;
      });
    });
  }

  saveChanges(genreCreationDto: genreCreationDto) {
    this.genresService.edit(this.model.id, genreCreationDto).subscribe(() => {
      this.router.navigate(['/genres']);
    });
  }
}
