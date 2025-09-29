export interface ModalidadPrivada {
  id: number;
  codigo: string;
  modalidad_seleccion: string;
}

export interface ModalidadPublica {
  id: number;
  codigo: string;
  modalidad_seleccion: string;
  depende_de: number;
  habilitado: boolean;
}

export interface ModalidadPublicaCreate {
  codigo: string;
  modalidad_seleccion: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface ModalidadesResponse {
  privadas: ModalidadPrivada[];
  publicas: ModalidadPublica[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

