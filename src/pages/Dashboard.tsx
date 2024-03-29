import React, { useEffect } from 'react';
import { Filters, Table } from 'components';
import { useQuery } from 'react-query';
import { getContracts, getContractsDistincsValues } from 'api';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { DistinctOptions, ResponseContracts, Contract } from 'interfaces';
import { setContracts, setOptions, setConfigPaginator } from './dashboardSlice';
import { Loading } from './Loading';

export const Dashboard = () => {
  const licitacionesState = useAppSelector((state) => state.licitaciones);
  const { configPaginator, singleFilter, groupFilter } = licitacionesState;
  const { limit, page } = configPaginator;
  const dispatch = useAppDispatch();

  const { isLoading } = useQuery('distincsValues', getContractsDistincsValues, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (dataResponse: DistinctOptions) => {
      dispatch(setOptions(dataResponse));
    },
  });

  const {
    isLoading: loadingRequest,
    isFetching: fetchingRequest,
    refetch,
  } = useQuery(
    'licitaciones',
    () => getContracts({ limit, page }, { ...singleFilter, ...groupFilter }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: (dataResponse: ResponseContracts) => {
        const data2 = dataResponse.data;
        const changeData = data2.map((x: Contract, index: number) => ({
          ...x,
          id: index,
        }));
        dispatch(setContracts(changeData));
        dispatch(setConfigPaginator({ totalResults: dataResponse.totalResults ?? 0 }));
      },
    },
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleFilter, groupFilter, limit, page]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col w-screen h-screen  p-14 gap-5">
      <div>
        <h1 className="text-5xl font-bold">Find Licitaciones MX</h1>
        <h1 className="text-2xl">Este no es un sitio oficial de compranet!</h1>
        <h1 className="text-2xl">
          Estos datos fueron obtenidos del sitio oficial de compranet, solo se reflejan los datos
          obtenidos en el 2022
        </h1>
      </div>
      <div className="w-full flex justify-end ">
        <Filters />
      </div>

      <Table loading={loadingRequest || fetchingRequest} />
    </div>
  );
};
