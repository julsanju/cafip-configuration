import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BancosResponse, BancoPublicoCreate } from '../models/banco.model';

@Injectable({ providedIn: 'root' })
export class BancosService {
  private readonly baseUrl = 'http://localhost:3000/bancos';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 4): Observable<BancosResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<BancosResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: BancoPublicoCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<BancoPublicoCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

