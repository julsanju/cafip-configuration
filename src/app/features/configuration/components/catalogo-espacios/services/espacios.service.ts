import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspaciosResponse, EspacioPublicoCreate } from '../models/espacio.model';

@Injectable({ providedIn: 'root' })
export class EspaciosService {
  private readonly baseUrl = 'http://localhost:3000/catalogo-espacios';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 4): Observable<EspaciosResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<EspaciosResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: EspacioPublicoCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<EspacioPublicoCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

