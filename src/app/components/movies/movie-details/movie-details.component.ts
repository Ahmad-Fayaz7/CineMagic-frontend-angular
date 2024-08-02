import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { movieDto } from '../movie.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { mapCoordinatesWithMessage } from '../../utils/map/coordinate';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { MapComponent } from '../../utils/map/map.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    RouterLink,
    MarkdownComponent,
    MapComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  movie!: movieDto;
  releaseDate!: Date;
  trailerUrl!: SafeResourceUrl;
  coordinates: mapCoordinatesWithMessage[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.movieService.getById(params['id']).subscribe((movie) => {
        console.log(movie);
        this.movie = movie;
        this.releaseDate = new Date(movie.releaseDate);
        this.trailerUrl = this.generatYoutubeURLForEmbeddedVideo(movie.trailer);
        this.coordinates = movie.movieTheaters.map((movieTheater) => {
          return {
            latitude: movieTheater.latitude,
            longitude: movieTheater.longitude,
            message: movieTheater.name,
          };
        });
      });
    });
  }

  generatYoutubeURLForEmbeddedVideo(url: any): SafeResourceUrl {
    if (!url) {
      return '';
    }
    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }
}
