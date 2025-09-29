export interface BienServicioPrivado {
  id: number;
  grupo: string;
  codigoSegmento: string;
  nombreSegmento: string;
  codigoFamilia: string;
  nombreFamilia: string;
  codigoClase: string;
  nombreClase: string;
  codigoProducto: string;
  nombreProducto: string;
}

export interface BienServicioPublico {
  id: number;
  grupo: string;
  codigoSegmento: string;
  nombreSegmento: string;
  codigoFamilia: string;
  nombreFamilia: string;
  codigoClase: string;
  nombreClase: string;
  codigoProducto: string;
  nombreProducto: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface BienServicioPublicoCreate {
  grupo: string;
  codigoSegmento: string;
  nombreSegmento: string;
  codigoFamilia: string;
  nombreFamilia: string;
  codigoClase: string;
  nombreClase: string;
  codigoProducto: string;
  nombreProducto: string;
  dependeDeId: number;
  habilitado: boolean;
}

export interface BienesServiciosResponse {
  privadas: BienServicioPrivado[];
  publicas: BienServicioPublico[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

