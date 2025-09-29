import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnidadesResponse, UnidadPublicaCreate } from '../models/unidad.model';

@Injectable({ providedIn: 'root' })
export class UnidadesService {
  private readonly baseUrl = 'http://localhost:3000/catalogo-unidades';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 4): Observable<UnidadesResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<UnidadesResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: UnidadPublicaCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<UnidadPublicaCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

