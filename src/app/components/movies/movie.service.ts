import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { movieCreationDto, movieDto, movieGetPostDto } from './movie.model';
import { formatDateFormData } from '../utils/utility-functions';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  // URL of the API
  private apiUrl = environment.apiUrl + '/movies';

  // Returns movieGetPostDto which contains the list of genres and theaters of a movie
  public getPost(): Observable<movieGetPostDto> {
    return this.http.get<movieGetPostDto>(`${this.apiUrl}/getpost`);
  }

  // Get a movie by Id
  getById(id: number): Observable<movieDto> {
    return this.http.get<movieDto>(`${this.apiUrl}/${id}`);
  }

  // Creates a movie
  public create(movieCreationDto: movieCreationDto) {
    const formData = this.buildFormData(movieCreationDto);
    return this.http.post(this.apiUrl, formData);
  }

  // Prepares the from data
  private buildFormData(movieCreationDto: movieCreationDto) {
    console.log(movieCreationDto);
    const formData = new FormData();
    formData.append('Title', movieCreationDto.title);
    formData.append('Summary', movieCreationDto.summary);
    formData.append('', movieCreationDto.trailer);
    formData.append('GenresIds', JSON.stringify(movieCreationDto.genresIds));
    formData.append(
      'MovieTheatersIds',
      JSON.stringify(movieCreationDto.movieTheatersIds)
    );
    formData.append('Actors', JSON.stringify(movieCreationDto.actors));
    if (movieCreationDto.poster) {
      formData.append('Poster', movieCreationDto.poster);
    }
    if (movieCreationDto.releaseDate) {
      formData.append(
        'ReleaseDate',
        formatDateFormData(movieCreationDto.releaseDate)
      );
    }
    formData.append('InTheaters', String(movieCreationDto.inTheaters));
    formData.append('Trailer', movieCreationDto.trailer);

    return formData;
  }
}
