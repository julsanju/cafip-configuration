import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalidadesResponse, ModalidadPublicaCreate } from '../models/modalidad-seleccion.model';

@Injectable({ providedIn: 'root' })
export class ModalidadSeleccionService {
  private readonly baseUrl = 'http://localhost:3000/catalogo-modalidad-seleccion';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 4): Observable<ModalidadesResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<ModalidadesResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: ModalidadPublicaCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<ModalidadPublicaCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

