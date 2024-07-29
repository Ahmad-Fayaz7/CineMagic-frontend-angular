export interface movieCreationDto {
  title: string;
  poster: File;
  inTheater: boolean;
  summary: string;
  releaseDate: Date;
  trailer: string;
  genreIds: number[];
  movieTheaterIds: number[];
}

export interface movieDto {
  title: string;
  poster: string;
  inTheater: boolean;
  summary: string;
  releaseDate: Date;
  trailer: string;
}
