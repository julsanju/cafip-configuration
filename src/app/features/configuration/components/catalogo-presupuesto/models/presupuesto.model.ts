export interface PresupuestoPrivado {
  id: number;
  cuenta: string;
  concepto: string;
  nivel: number;
  clase: string;
}

export interface PresupuestoPublico {
  id: number;
  cuenta: string;
  concepto: string;
  nivel: number;
  clase: string;
  depende_de: number;
  habilitado: boolean;
}

export interface PresupuestoPublicoCreate {
  cuenta: string;
  concepto: string;
  nivel: number;
  clase: string;
  depende_de: number;
  habilitado: boolean;
}

export interface PresupuestoResponse {
  privadas: PresupuestoPrivado[];
  publicas: PresupuestoPublico[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

