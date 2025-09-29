import { EntidadPrivada } from './entidad-privada.model';

export interface EntidadPublica {
  id: number;
  municipio: string;
  nitFse: string;
  nombreEstablecimiento: string;
  email: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface EntidadPublicaCreate {
  municipio: string;
  nitFse: string;
  nombreEstablecimiento: string;
  email: string;
  dependeDeId: number;
  habilitado?: boolean;
}

export interface EntidadPublicaUpdate {
  municipio?: string;
  nitFse?: string;
  nombreEstablecimiento?: string;
  email?: string;
  dependeDeId?: number;
  habilitado?: boolean;
}

export interface EntidadesResponse {
  privadas: EntidadPrivada[];
  publicas: EntidadPublica[];
}
