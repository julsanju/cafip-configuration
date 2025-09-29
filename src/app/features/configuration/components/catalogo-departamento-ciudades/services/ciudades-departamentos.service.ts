import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CiudadesDepartamentosResponse, CiudadDepartamentoPublicaCreate } from '../models/ciudades-departamentos.model';

@Injectable({ providedIn: 'root' })
export class CiudadesDepartamentosService {
  private readonly baseUrl = 'http://localhost:3000/ciudades-departamentos';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 4): Observable<CiudadesDepartamentosResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<CiudadesDepartamentosResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: CiudadDepartamentoPublicaCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<CiudadDepartamentoPublicaCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

