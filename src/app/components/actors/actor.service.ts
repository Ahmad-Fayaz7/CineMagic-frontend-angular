import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actorCreationDto, actorDto, movieActorDto } from './actor.model';
import { environment } from '../../environments/environment';
import { formatDateFormData } from '../utils/utility-functions';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private apiUrl = environment.apiUrl + '/actors';
  constructor(private http: HttpClient) {}

  get(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<actorDto[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  getById(id: number): Observable<actorDto> {
    return this.http.get<actorDto>(`${this.apiUrl}/${id}`);
  }
  SearchByName(name: string): Observable<movieActorDto[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<movieActorDto[]>(
      `${this.apiUrl}/SearchByName`,
      JSON.stringify(name),
      { headers }
    );
  }
  create(actorCreationDto: actorCreationDto) {
    console.log(actorCreationDto);
    const formData = this.buildFormData(actorCreationDto);
    console.log(formData);
    return this.http.post(this.apiUrl, formData);
  }

  edit(id: number, actorCreationDto: actorCreationDto) {
    const formData = this.buildFormData(actorCreationDto);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private buildFormData(actor: actorCreationDto): FormData {
    const formData = new FormData();
    formData.append('Name', actor.name);
    if (actor.biography) {
      formData.append('biography', actor.biography);
    }

    if (actor.dateOfBirth) {
      formData.append('dateOfBirth', formatDateFormData(actor.dateOfBirth));
    }

    if (actor.picture) {
      formData.append('picture', actor.picture);
    }

    return formData;
  }
}
