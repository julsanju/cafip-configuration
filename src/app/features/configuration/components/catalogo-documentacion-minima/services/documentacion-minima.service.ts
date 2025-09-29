import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocMinResponse, DocMinPublicaCreate } from '../models/documentacion-minima.model';

@Injectable({ providedIn: 'root' })
export class DocumentacionMinimaService {
  private readonly baseUrl = 'http://localhost:3000/documentacion-minima';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 4): Observable<DocMinResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<DocMinResponse>(`${this.baseUrl}/list`, { params });
  }

  create(data: DocMinPublicaCreate) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id: number, data: Partial<DocMinPublicaCreate>) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

