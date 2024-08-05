import { Injectable } from '@angular/core';
import { authenticationResponse, userCredentials } from './security.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private apiUrl = environment.apiUrl + '/accounts';
  constructor(private http: HttpClient) {}

  getRole(): string {
    return '';
  }
  isAuthenticated(): boolean {
    return false;
  }

  register(
    userCredentials: userCredentials
  ): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(
      this.apiUrl + '/create',
      userCredentials
    );
  }
}
