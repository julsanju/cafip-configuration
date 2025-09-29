import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BienesServiciosResponse, BienServicioPublicoCreate } from '../models/bienes-servicios.model';

@Injectable({ providedIn: 'root' })
export class BienesServiciosService {
  private readonly baseUrl = 'http://localhost:3000/bienes-servicios';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 10): Observable<BienesServiciosResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<BienesServiciosResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: BienServicioPublicoCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<BienServicioPublicoCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

