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
import { RatingComponent } from '../../utils/rating/rating.component';
import { RatingService } from '../../utils/rating.service';
import { SweetAlertService } from '../../../utilities/sweet-alert/sweet-alret.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    RouterLink,
    MarkdownComponent,
    MapComponent,
    RatingComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ratingService: RatingService,
    private sweetAlert: SweetAlertService
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

  onRating(rate: number) {
    this.ratingService.rate(this.movie.id, rate).subscribe(() => {
      this.sweetAlert.success('You have rated succuessfully this movie!');
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
