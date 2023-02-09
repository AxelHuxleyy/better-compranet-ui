import { PaginatorConfig } from 'interfaces/paginatorConfig';
import { RequestValues } from 'interfaces/requestValues';
import { axiosConfig } from './config';

const baseURL = '/contracts';

const getContractsDistincsValues = async () => {
  const response = await axiosConfig.get(`${baseURL}/distincs`);
  return response.data;
};

const getContracts = async (params?: PaginatorConfig, body?: RequestValues) => {
  const response = await axiosConfig({ url: `${baseURL}`, params, data: body, method: 'POST' });
  return response.data.data;
};

export { getContractsDistincsValues, getContracts };
