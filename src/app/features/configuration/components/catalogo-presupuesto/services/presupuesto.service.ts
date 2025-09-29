import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PresupuestoResponse, PresupuestoPublicoCreate } from '../models/presupuesto.model';

@Injectable({ providedIn: 'root' })
export class PresupuestoService {
  private readonly baseUrl = 'http://localhost:3000/catalogo-presupuesto';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 4): Observable<PresupuestoResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<PresupuestoResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: PresupuestoPublicoCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<PresupuestoPublicoCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

