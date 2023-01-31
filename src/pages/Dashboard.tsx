import React, { useEffect } from 'react';
import { Filters, Table } from 'components';
import { useQuery } from 'react-query';
import { getDistincsValues, getLicitaciones } from 'api';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  DistinctOptions,
  ResponseLicitaciones,
  Licitacion as LicitacionInterface,
} from 'interfaces';
import { setLicitaciones, setOptions, setConfigPaginator } from './dashboardSlice';

export const Dashboard = () => {
  const licitacionesState = useAppSelector((state) => state.licitaciones);
  const { requestValues, configPaginator } = licitacionesState;
  const { limit, page } = configPaginator;
  const dispatch = useAppDispatch();

  const { isLoading } = useQuery('todos', getDistincsValues, {
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
  } = useQuery('licitaciones', () => getLicitaciones({ limit, page }, requestValues), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (dataResponse: ResponseLicitaciones) => {
      const data2 = dataResponse.data;
      const changeData = data2.map((x: LicitacionInterface, index: number) => ({
        ...x,
        id: index,
      }));
      dispatch(setLicitaciones(changeData));
      dispatch(setConfigPaginator({ totalResults: dataResponse.totalResults ?? 0 }));
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestValues, limit, page]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col w-screen h-screen  p-14 gap-5">
      <div>
        <h1 className="text-5xl font-bold">Dashboard</h1>
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
