export interface BancoPrivado {
  id: number;
  banco: string;
  codigoBancoAch: string;
}

export interface BancoPublico {
  id: number;
  banco: string;
  codigoBancoAch: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface BancoPublicoCreate {
  banco: string;
  codigoBancoAch: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface BancosResponse {
  privadas: BancoPrivado[];
  publicas: BancoPublico[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

