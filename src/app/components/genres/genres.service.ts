// genres.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { genreCreationDto, genreDto } from './genre.model';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private apiUrl = environment.apiUrl + '/genres';
  constructor(private http: HttpClient) {}

  getGenres(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  create(genre: genreCreationDto) {
    return this.http.post(this.apiUrl, genre);
  }
  getById(id: number): Observable<genreDto> {
    return this.http.get<genreDto>(`${this.apiUrl}/${id}`);
  }
  edit(id: number, genreCreationDto: genreCreationDto) {
    return this.http.put<genreCreationDto>(
      `${this.apiUrl}/${id}`,
      genreCreationDto
    );
  }
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
