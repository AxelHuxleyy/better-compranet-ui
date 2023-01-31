import { ConfigPaginator } from './configPaginator';
import { Licitacion } from './licitacion';

export interface ResponseLicitaciones extends ConfigPaginator {
  data: Array<Licitacion>;
}
