export interface UnidadPrivada {
  id: number;
  codigo: string;
  nombre: string;
}

export interface UnidadPublica {
  id: number;
  codigo: string;
  nombre: string;
  depende_de: number;
  habilitado: boolean;
}

export interface UnidadPublicaCreate {
  codigo: string;
  nombre: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface UnidadesResponse {
  privadas: UnidadPrivada[];
  publicas: UnidadPublica[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

