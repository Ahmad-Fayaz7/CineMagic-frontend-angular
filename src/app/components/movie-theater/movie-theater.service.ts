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
}
