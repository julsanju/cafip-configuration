export interface DocMinPrivada {
  id: number;
  item: string;
  requisito: string;
  persona: boolean;
  persona_juridica: boolean;
  persona_natural: boolean;
}

export interface DocMinPublica {
  id: number;
  item: string;
  requisito: string;
  persona: boolean;
  persona_juridica: boolean;
  persona_natural: boolean;
  depende_de: number;
  habilitado: boolean;
}

export interface DocMinPublicaCreate {
  item: string;
  requisito: string;
  persona: boolean;
  persona_juridica: boolean;
  persona_natural: boolean;
  dependeDeId: number;
  habilitado: boolean;
}

export interface DocMinResponse {
  privadas: DocMinPrivada[];
  publicas: DocMinPublica[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

