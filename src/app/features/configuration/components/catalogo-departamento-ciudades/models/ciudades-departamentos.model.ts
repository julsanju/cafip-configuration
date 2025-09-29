export interface CiudadDepartamentoPrivada {
  id: number;
  departamento: string;
  ciudades: string;
  provincia: string;
  codigo_municipio: string;
  nombre_municipio: string;
  nombre: string;
  total: number;
}

export interface CiudadDepartamentoPublica {
  id: number;
  departamento: string;
  ciudades: string;
  provincia: string;
  codigo_municipio: string;
  nombre_municipio: string;
  nombre: string;
  total: number;
  dependeDeId: number;
  habilitado: boolean;
}

export interface CiudadDepartamentoPublicaCreate {
  departamento: string;
  ciudades: string;
  provincia: string;
  codigo_municipio: string;
  nombre_municipio: string;
  nombre: string;
  total: number;
  dependeDeId: number;
  habilitado: boolean;
}

export interface CiudadesDepartamentosResponse {
  privadas: CiudadDepartamentoPrivada[];
  publicas: CiudadDepartamentoPublica[];
  meta: {
    page: number;
    limit: number;
    totalPrivadas: number;
    totalPublicas: number;
    pagesPrivadas: number;
    pagesPublicas: number;
  };
}

