import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposContratoResponse, TipoContratoPublicoCreate } from '../models/tipo-contrato.model';

@Injectable({ providedIn: 'root' })
export class TipoContratoService {
  private readonly baseUrl = 'http://localhost:3000/catalogo-tipo-contratos';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 4): Observable<TiposContratoResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<TiposContratoResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: TipoContratoPublicoCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<TipoContratoPublicoCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

