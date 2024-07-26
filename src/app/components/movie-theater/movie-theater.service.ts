import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  movieTheaterDto,
  movieTheaterCreationDto,
} from './movie-theater.model';

@Injectable({
  providedIn: 'root',
})
export class MovieTheaterService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/movietheaters';

  public create(movieTheaterCreationDto: movieTheaterCreationDto) {
    return this.http.post(this.apiUrl, movieTheaterCreationDto);
  }

  public get(): Observable<movieTheaterDto[]> {
    return this.http.get<movieTheaterDto[]>(this.apiUrl);
  }
  public getById(id: number): Observable<movieTheaterDto> {
    return this.http.get<movieTheaterDto>(`${this.apiUrl}/${id}`);
  }
  public edit(id: number, movieTheaterCreationDto: movieTheaterCreationDto) {
    return this.http.put(`${this.apiUrl}/${id}`, movieTheaterCreationDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
