import { movieActorDto } from '../actors/actor.model';
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
  title: string;
  poster: string;
  inTheater: boolean;
  summary: string;
  releaseDate: Date;
  trailer: string;
}

export interface movieGetPostDto {
  genres: genreDto[];
  movieTheaters: movieTheaterDto[];
}
