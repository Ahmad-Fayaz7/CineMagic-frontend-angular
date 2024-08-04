import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  homeDto,
  movieCreationDto,
  movieDto,
  movieGetPostDto,
  MoviePutGetDto,
} from './movie.model';
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

  // Get a movie object for movie edit page
  getPut(id: number): Observable<MoviePutGetDto> {
    return this.http.get<MoviePutGetDto>(`${this.apiUrl}/putget/${id}`);
  }

  // Edit a movie
  edit(id: number, movieCreationDto: movieCreationDto) {
    const formdata = this.buildFormData(movieCreationDto);
    return this.http.put(`${this.apiUrl}/${id}`, formdata);
  }

  // Delete a movie
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Filter movies
  filter(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });
    // observe: 'respnse' makes the httpClient to return full HttpResponse<T> object instead of just the response body of type T.
    return this.http.get<movieDto[]>(`${this.apiUrl}/filter`, {
      params,
      observe: 'response', // becuase we the info in header for pagination
    });
  }

  // Get movies for landing page
  getHomePageMovies(): Observable<homeDto> {
    return this.http.get<homeDto>(this.apiUrl);
  }

  // Creates a movie
  public create(movieCreationDto: movieCreationDto): Observable<number> {
    const formData = this.buildFormData(movieCreationDto);
    return this.http.post<number>(this.apiUrl, formData);
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
