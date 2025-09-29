export interface EntidadPrivada {
  id: number;
  municipio: string;
  nitFse: string;
  nombreEstablecimiento: string;
  email: string;
}

export interface EntidadPrivadaCreate {
  municipio: string;
  nitFse: string;
  nombreEstablecimiento: string;
  email: string;
}

export interface EntidadPrivadaUpdate {
  municipio?: string;
  nitFse?: string;
  nombreEstablecimiento?: string;
  email?: string;
}

