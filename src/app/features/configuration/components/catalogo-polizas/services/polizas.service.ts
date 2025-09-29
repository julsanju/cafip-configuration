import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PolizasResponse, PolizaPublicaCreate } from '../models/poliza.model';

@Injectable({ providedIn: 'root' })
export class PolizasService {
  private readonly baseUrl = 'http://localhost:3000/catalogo-polizas';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 4): Observable<PolizasResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<PolizasResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: PolizaPublicaCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<PolizaPublicaCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

