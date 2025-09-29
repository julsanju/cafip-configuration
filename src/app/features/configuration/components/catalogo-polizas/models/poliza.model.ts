export interface PolizaPrivada {
  id: number;
  codigo: string;
  polizas: string;
}

export interface PolizaPublica {
  id: number;
  codigo: string;
  polizas: string;
  depende_de: number;
  habilitado: boolean;
}

export interface PolizaPublicaCreate {
  codigo: string;
  polizas: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface PolizasResponse {
  privadas: PolizaPrivada[];
  publicas: PolizaPublica[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

