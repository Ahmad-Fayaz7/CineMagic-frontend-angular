import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/ratings';

  rate(movieId: number, rate: number) {
    return this.http.post(this.apiUrl, { movieId, rate });
  }
}
