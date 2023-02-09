import { ConfigPaginator } from './configPaginator';
import { Contract } from './contract';

export interface ResponseContracts extends ConfigPaginator {
  data: Array<Contract>;
}
