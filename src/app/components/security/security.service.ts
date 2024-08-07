import { Injectable } from '@angular/core';
import { authenticationResponse, userCredentials } from './security.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/accounts';
  tokenKey: string = 'token';
  expirationTokenKey: string = 'token-expiration';

  getRole(): string {
    return '';
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }
    const expiration: any = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(expiration);
    if (expirationDate <= new Date()) {
      this.logout();
      return false;
    }
    return true;
  }

  getFieldFromJWT(field: string): string {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return '';
    }
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationTokenKey);
  }

  register(
    userCredentials: userCredentials
  ): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(
      this.apiUrl + '/create',
      userCredentials
    );
  }
  login(userCredentials: userCredentials): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(
      this.apiUrl + '/login',
      userCredentials
    );
  }
  saveToken(authenticationResponse: authenticationResponse) {
    localStorage.setItem(this.tokenKey, authenticationResponse.token);
    localStorage.setItem(
      this.expirationTokenKey,
      authenticationResponse.expiration.toString()
    );
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
