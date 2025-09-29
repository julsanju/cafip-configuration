import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  EntidadPrivada, 
  EntidadPrivadaCreate, 
  EntidadPrivadaUpdate 
} from '../models/entidad-privada.model';
import { 
  EntidadPublica, 
  EntidadPublicaCreate, 
  EntidadPublicaUpdate,
  EntidadesResponse 
} from '../models/entidad-publica.model';
import { environment } from '../../../../../../environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {
  private readonly baseUrl = environment.apiUrl + 'entidades';

  constructor(private http: HttpClient) {}

  // Obtener todas las entidades (privadas y públicas)
  getEntidades(): Observable<EntidadesResponse> {
    return this.http.get<EntidadesResponse>(`${this.baseUrl}/list`);
  }

  // Obtener entidad privada por ID
  getEntidadPrivada(id: number): Observable<EntidadPrivada> {
    return this.http.get<EntidadPrivada>(`${this.baseUrl}/privada/${id}`);
  }

  // Obtener entidad pública por ID
  getEntidadPublica(id: number): Observable<EntidadPublica> {
    return this.http.get<EntidadPublica>(`${this.baseUrl}/publica/${id}`);
  }

  // Crear entidad pública vinculada a una privada
  createEntidadPublica(entidad: EntidadPublicaCreate): Observable<EntidadPublica> {
    return this.http.post<EntidadPublica>(`${this.baseUrl}/create`, entidad);
  }

  // Actualizar entidad pública
  updateEntidadPublica(id: number, entidad: EntidadPublicaUpdate): Observable<EntidadPublica> {
    return this.http.patch<EntidadPublica>(`${this.baseUrl}/${id}`, entidad);
  }

  // Desactivar entidad pública (soft delete)
  deleteEntidadPublica(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
