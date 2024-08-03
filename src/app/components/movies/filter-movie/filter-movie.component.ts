import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CommonModule, Location } from '@angular/common';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieService } from '../movie.service';
import { genreDto } from '../../genres/genre.model';
import { movieDto } from '../movie.model';
import { HttpResponse } from '@angular/common/http';
import { GenresService } from '../../genres/genres.service';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filter-movie',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    RouterLink,
    CommonModule,
    MovieListComponent,
    GenericListComponent,
  ],
  templateUrl: './filter-movie.component.html',
  styleUrl: './filter-movie.component.css',
})
export class FilterMovieComponent {
  movieFilterForm!: FormGroup;
  genres!: genreDto[];
  movies!: movieDto[];
  filterFormInitialValues: any;
  currentPage = 1;
  recordsPerPage = 10;
  totalAmountOfRecords: any;
  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private genreService: GenresService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movieFilterForm = this.formBuilder.group({
      title: ['', Validators.required],
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false,
    });
    this.filterFormInitialValues = this.movieFilterForm.value;
    this.readParamsFromUrl();
    this.genreService.getGenres().subscribe((data) => {
      this.genres = data;

      this.filterMovies(this.movieFilterForm.value);

      this.movieFilterForm.valueChanges.subscribe((values) => {
        this.filterMovies(values);
        this.writeParametersInUrl();
      });
    });
  }

  filterMovies(values: any) {
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;
    this.movieService
      .filter(values)
      .subscribe((response: HttpResponse<movieDto[]>) => {
        if (response.body !== null) {
          this.movies = response.body;
        }

        this.totalAmountOfRecords = response.headers.get(
          'totalAmountOfRecords'
        );
      });
  }

  paginatorUpdate(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.recordsPerPage = event.pageSize;
    this.filterMovies(this.movieFilterForm.value);
    this.writeParametersInUrl();
  }

  readParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var obj: any = {};

      if (params['title']) {
        obj.title = params['title'];
      }

      if (params['genreId']) {
        obj.genreId = params['genreId'];
      }

      if (params['upcomingReleases']) {
        obj.upcomingReleases = params['upcomingReleases'];
      }

      if (params['inTheates']) {
        obj.inTheaters = params['inTheaters'];
      }

      if (params['currentPage']) {
        this.currentPage = params['currentPage'];
      }

      if (params['recordsPerPage']) {
        this.recordsPerPage = params['recordsPerPage'];
      }
      this.movieFilterForm.patchValue(obj);
    });
  }

  writeParametersInUrl() {
    const queryString = [];

    const formValues = this.movieFilterForm.value;

    if (formValues.title) {
      queryString.push(`title=${formValues.title}`);
    }

    if (formValues.genreId) {
      queryString.push(`genreId=${formValues.genreId}`);
    }

    if (formValues.upcomingReleases) {
      queryString.push(`upcomingReleases=${formValues.upcomingReleases}`);
    }

    if (formValues.inTheaters) {
      queryString.push(`inTheaters=${formValues.inTheaters}`);
    }

    if (this.currentPage) {
      queryString.push(`currentPage=${this.currentPage}`);
    }

    if (this.recordsPerPage) {
      queryString.push(`recordsPerPage=${this.recordsPerPage}`);
    }

    // Correctly update the URL with query parameters
    this.location.replaceState('movies/filter', queryString.join('&'));
  }

  clearForm() {
    this.movieFilterForm.patchValue(this.filterFormInitialValues);
  }
}
