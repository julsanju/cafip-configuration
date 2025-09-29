export interface TipoContratoPrivado {
  id: number;
  codigo: string;
  tipo_contrato: string;
}

export interface TipoContratoPublico {
  id: number;
  codigo: string;
  tipo_contrato: string;
  depende_de: number;
  habilitado: boolean;
}

export interface TipoContratoPublicoCreate {
  codigo: string;
  tipo_contrato: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface TiposContratoResponse {
  privadas: TipoContratoPrivado[];
  publicas: TipoContratoPublico[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

