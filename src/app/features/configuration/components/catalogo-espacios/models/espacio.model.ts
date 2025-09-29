export interface EspacioPrivado {
  id: number;
  codigo: string;
  dependencia: string;
}

export interface EspacioPublico {
  id: number;
  codigo: string;
  dependencia: string;
  depende_de: number;
  habilitado: boolean;
}

export interface EspacioPublicoCreate {
  codigo: string;
  dependencia: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface EspaciosResponse {
  privadas: EspacioPrivado[];
  publicas: EspacioPublico[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

