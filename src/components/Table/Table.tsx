import React, { FC } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { visibilityModel } from 'constants/visibilityModel';
import { setConfigPaginator } from 'pages/dashboardSlice';
import { formatDate, formatDateTime } from 'utils/date';

interface Props {
  loading: boolean;
}

export const Table: FC<Props> = (props) => {
  const { loading } = props;
  const stateLicitaciones = useAppSelector((x) => x.licitaciones);
  const { licitaciones: rows, configPaginator } = stateLicitaciones;
  const { totalResults, page, limit } = configPaginator;
  const dispatch = useAppDispatch();

  const goToURL = (url: string) => {
    window.open(url, '_blank');
  };

  const columns: GridColDef[] = [
    {
      field: 'expCode',
      headerName: 'Código de exp.',
      description: 'Código de expediente',
      flex: 1,
    },
    {
      field: 'expNumber',
      headerName: 'numero de exp.',
      description: 'Número de expediente',
      flex: 1,
    },
    {
      field: 'character',
      headerName: 'Carácter del exp.',
      description: 'Carácter del expediente',
      flex: 1,
    },
    {
      field: 'form',
      headerName: 'Forma del proce.',
      description: 'Forma del procedimiento',
      flex: 1,
    },
    {
      field: 'expRef',
      headerName: 'Ref del exp.',
      description: 'Referencia del expediente',
      flex: 1,
    },
    {
      field: 'expTitle',
      headerName: 'Titulo expediente.',
      description: 'Titulo del expediente',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.row.expTitle as string} placement="top-start">
          <span>{params.row.expTitle}</span>
        </Tooltip>
      ),
    },
    {
      field: 'expTemplate',
      headerName: 'Plantilla',
      description: 'Plantilla del expediente',
      flex: 1,
    },
    {
      field: 'descAdd',
      headerName: 'Descripción anuncio',
      description: 'Descripción del anuncio',
      flex: 1,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.row.descAdd as string} placement="top-start">
          <span>{params.row.descAdd}</span>
        </Tooltip>
      ),
    },
    {
      field: 'keyUC',
      headerName: 'Clave UC',
      description: 'Clave UC',
      flex: 1,
    },
    {
      field: 'nameUC',
      headerName: 'Nombre UC',
      description: 'Nombre de la UC',
      flex: 1,
    },
    {
      field: 'operator',
      headerName: 'Operador',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.row.operator as string} placement="top-start">
          <span>{params.row.operator}</span>
        </Tooltip>
      ),
    },
    {
      field: 'email',
      headerName: 'email',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.row.email as string} placement="top-start">
          <span>{params.row.email}</span>
        </Tooltip>
      ),
    },
    {
      field: 'state',
      headerName: 'Entidad',
      description: 'Entidad Federativa',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Tipo contratación',
      description: 'Tipo de contratación',
      flex: 1,
    },
    {
      field: 'dateStart',
      headerName: 'Publicación anuncio',
      description: 'Publicación del anuncio',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={formatDateTime(params.row.dateStart)} placement="top-start">
          <span>{formatDate(params.row.dateStart)}</span>
        </Tooltip>
      ),
    },
    {
      field: 'dateEnd',
      headerName: 'Vencimiento anuncio',
      description: 'Vigencia del anuncio',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={formatDateTime(params.row.dateEnd)} placement="top-start">
          <span>{formatDate(params.row.dateEnd)}</span>
        </Tooltip>
      ),
    },
    {
      field: 'keyCOG',
      headerName: 'Clave COG',
      flex: 1,
    },
    {
      field: 'creationDate',
      headerName: 'Fecha de creación',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={formatDateTime(params.row.creationDate)} placement="top-start">
          <span>{formatDate(params.row.creationDate)}</span>
        </Tooltip>
      ),
    },
    {
      field: 'lastUpdate',
      headerName: 'Ultima actualización',
      description: 'Fecha de ultima actualización',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={formatDateTime(params.row.lastUpdate)} placement="top-start">
          <span>{formatDate(params.row.lastUpdate)}</span>
        </Tooltip>
      ),
    },
    {
      field: 'url',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => goToURL(params.row.url)} variant="contained">
          ir al anuncio
        </Button>
      ),
    },
  ];

  return (
    <DataGrid
      rows={rows || []}
      initialState={{
        columns: {
          columnVisibilityModel: visibilityModel,
        },
      }}
      columns={columns}
      rowCount={totalResults}
      loading={loading}
      page={page}
      pageSize={limit}
      paginationMode="server"
      onPageChange={(newPageSize) => dispatch(setConfigPaginator({ page: Number(newPageSize) }))}
      onPageSizeChange={(newPageSize) =>
        dispatch(setConfigPaginator({ limit: Number(newPageSize) }))
      }
      rowsPerPageOptions={[10, 50, 100]}
    />
  );
};
