import { Injectable } from '@angular/core';
import {
  authenticationResponse,
  userCredentials,
  UserDto,
} from './security.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/accounts';
  private readonly tokenKey: string = 'token';
  private readonly expirationTokenKey: string = 'token-expiration';
  private readonly roleFiled: string = 'role';

  getRole(): string {
    return this.getFieldFromJWT(this.roleFiled);
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

  getUsers(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());

    return this.http.get<UserDto[]>(`${this.apiUrl}/users`, {
      observe: 'response',
      params,
    });
  }

  makeAdmin(userId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiUrl}/makeadmin`, JSON.stringify(userId), {
      headers,
    });
  }

  removeAdmin(userId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(
      `${this.apiUrl}/removeadmin`,
      JSON.stringify(userId),
      { headers }
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
