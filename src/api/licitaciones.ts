import { RequestValues, PaginatorConfig } from 'interfaces';
import { axiosConfig } from './config';

const baseURL = '/licitaciones';

const getDistincsValues = async () => {
  const response = await axiosConfig.get(`${baseURL}/distincs`);
  return response.data;
};

const getLicitaciones = async (params?: PaginatorConfig, body?: RequestValues) => {
  const response = await axiosConfig({ url: `${baseURL}`, params, data: body, method: 'POST' });
  return response.data.data;
};

export { getDistincsValues, getLicitaciones };
