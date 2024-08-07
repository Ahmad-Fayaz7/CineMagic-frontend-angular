import { actorDto, movieActorDto } from '../actors/actor.model';
import { genreDto } from '../genres/genre.model';
import { movieTheaterDto } from '../movie-theater/movie-theater.model';

export interface movieCreationDto {
  title: string;
  poster: File;
  inTheaters: boolean;
  summary: string;
  releaseDate: Date;
  trailer: string;
  genresIds: number[];
  movieTheatersIds: number[];
  actors: movieActorDto[];
}

export interface movieDto {
  id: number;
  title: string;
  poster: string;
  inTheaters: boolean;
  summary: string;
  releaseDate: Date;
  trailer: string;
  genres: genreDto[];
  movieTheaters: movieTheaterDto[];
  actors: movieActorDto[];
  averageRate: number;
  userRate: number;
}

export interface movieGetPostDto {
  genres: genreDto[];
  movieTheaters: movieTheaterDto[];
}

export interface homeDto {
  inTheaters: movieDto[];
  upcomingReleases: movieDto[];
}

export interface MoviePutGetDto {
  movie: movieDto;
  selectedGenres: genreDto[];
  nonSelectedGenres: genreDto[];
  selectedMovieTheaters: movieTheaterDto[];
  nonSelectedMovieTheaters: movieTheaterDto[];
  actors: movieActorDto[];
}
