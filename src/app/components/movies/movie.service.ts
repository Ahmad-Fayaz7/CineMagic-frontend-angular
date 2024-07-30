import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { movieGetPostDto } from './movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/movies';
  public getPost(): Observable<movieGetPostDto> {
    return this.http.get<movieGetPostDto>(`${this.apiUrl}/getpost`);
  }
}
