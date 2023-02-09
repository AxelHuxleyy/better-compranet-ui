import React, { FC } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Tooltip, Typography } from '@mui/material';
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
  const { contracts: rows, configPaginator } = stateLicitaciones;
  const { totalResults, page, limit } = configPaginator;
  const dispatch = useAppDispatch();

  const goToURL = (url: string) => {
    window.open(url, '_blank');
  };

  const columns: GridColDef[] = [
    {
      field: 'govOrder',
      headerName: 'Orden de gobierno',
      flex: 1,
    },
    {
      field: 'instAcronym',
      headerName: 'Siglas de la Institución',
      description: 'Siglas de la Institución',
      flex: 1,
    },
    {
      field: 'inst',
      headerName: 'Institución',
      description: 'Institución',
      flex: 1,
    },
    {
      field: 'keyUC',
      headerName: 'Clave de la UC',
      description: 'Clave de la UC',
      flex: 1,
    },
    {
      field: 'nameUC',
      headerName: 'Nombre de la UC',
      description: 'Nombre de la UC',
      flex: 1,
    },
    {
      field: 'managerUC',
      headerName: 'Responsable de la UC',
      description: 'Responsable de la UC',
      flex: 1,
    },
    {
      field: 'expCode',
      headerName: 'Código del expediente',
      description: 'Código del expediente',
      flex: 1,
    },
    {
      field: 'expRef',
      headerName: 'Referencia del expediente',
      description: 'Referencia del expediente',
      flex: 1,
      type: 'string',
    },
    {
      field: 'keyCUCOP',
      headerName: 'Clave CUCOP',
      description: 'Clave CUCOP',
      flex: 1,
    },
    {
      field: 'expTitle',
      headerName: 'Título del expediente',
      description: 'Título del expediente',
      flex: 1,
    },
    {
      field: 'expTemplate',
      headerName: 'Plantilla del expediente',
      flex: 1,
    },
    {
      field: 'legal',
      headerName: 'Fundamento legal',
      flex: 1,
    },
    {
      field: 'processNum',
      headerName: 'Número del procedimiento',
      description: 'Número del procedimiento',
      flex: 1,
    },
    {
      field: 'falloDate',
      headerName: 'Fecha de fallo',
      description: 'Fecha de fallo',
      flex: 1,
    },
    {
      field: 'publishDate',
      headerName: 'Fecha de publicación',
      description: 'Fecha de publicación',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={formatDateTime(params.row.dateStart)} placement="top-start">
          <span>{formatDate(params.row.dateStart)}</span>
        </Tooltip>
      ),
    },
    {
      field: 'openDate',
      headerName: 'Fecha de apertura',
      description: 'Fecha de apertura',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={formatDateTime(params.row.dateEnd)} placement="top-start">
          <span>{formatDate(params.row.dateEnd)}</span>
        </Tooltip>
      ),
    },
    {
      field: 'character',
      headerName: 'Carácter del procedimiento',
      flex: 1,
    },
    {
      field: 'contractType',
      headerName: 'Tipo de contratación',
      flex: 1,
    },
    {
      field: 'processType',
      headerName: 'Tipo de procedimiento',
      description: 'Tipo de procedimiento',
      flex: 1,
    },
    {
      field: 'formParticipation',
      headerName: 'Forma de participación',
      flex: 1,
    },
    {
      field: 'contractCode',
      headerName: 'Código del contrato',
      description: 'Código del contrato',
      flex: 1,
    },
    {
      field: 'contractControlNum',
      headerName: 'Núm. de control del contrato',
      description: 'Núm. de control del contrato',
      flex: 1,
    },
    {
      field: 'contractTitle',
      headerName: 'Título del contrato',
      description: 'Título del contrato',
      flex: 1,
    },
    {
      field: 'contractDesc',
      headerName: 'Descripción del contrato',
      description: 'Descripción del contrato',
      flex: 1,
    },
    {
      field: 'contractStartDate',
      headerName: 'Fecha de inicio del contrato',
      description: 'Fecha de inicio del contrato',
      flex: 1,
    },
    {
      field: 'contractEndDate',
      headerName: 'Fecha de fin del contrato',
      description: 'Fecha de fin del contrato',
      flex: 1,
    },
    {
      field: 'contractAmount',
      headerName: 'Importe del contrato',
      description: 'Importe del contrato',
      flex: 1,
      type: 'number',
    },
    {
      field: 'contractCurrency',
      headerName: 'Moneda del contrato',
      description: 'Moneda del contrato',
      flex: 1,
    },
    {
      field: 'contractEstatus',
      headerName: 'Estatus del contrato',
      description: 'Estatus del contrato',
      flex: 1,
    },
    {
      field: 'modifyConvenio',
      headerName: 'Convenio modificatorio',
      type: 'boolean',
      flex: 1,
    },
    {
      field: 'keyProgramFederal',
      headerName: 'Clave del programa federal',
      flex: 1,
    },
    {
      field: 'contractSignDate',
      headerName: 'Fecha de firma del contrato',
      description: 'Fecha de firma del contrato',
      flex: 1,
    },
    {
      field: 'contractMarco',
      headerName: 'Contrato marco',
      description: 'Contrato marco',
      flex: 1,
    },
    {
      field: 'purchaseCompleted',
      headerName: 'Compra consolidada',
      type: 'boolean',
      flex: 1,
    },
    {
      field: 'contractPluriannual',
      headerName: 'Contrato plurianual',
      description: 'Contrato plurianual',
      type: 'boolean',
      flex: 1,
    },
    {
      field: 'keyWalletSHCP',
      headerName: 'Clave de cartera SHCP',
      flex: 1,
    },
    {
      field: 'folioRUPC',
      headerName: 'Folio en el RUPC',
      description: 'Folio en el RUPC',
      flex: 1,
    },
    {
      field: 'providerName',
      headerName: 'Proveedor o contratista',
      description: 'Proveedor o contratista',
      flex: 1,
    },
    {
      field: 'companySize',
      headerName: 'Estratificación de la empresa',
      description: 'Estratificación de la empresa',
      flex: 1,
    },
    {
      field: 'companyCountryKey',
      headerName: 'Clave del país de la empresa',
      description: 'Clave del país de la empresa',
      flex: 1,
    },
    {
      field: 'rfcVerified',
      headerName: 'RFC verificado en el SAT',
      description: 'RFC verificado en el SAT',
      type: 'boolean',
      flex: 1,
    },
    {
      field: 'externCredit',
      headerName: 'Crédito externo',
      description: 'Crédito externo',
      flex: 1,
    },
    {
      field: 'financialOrganization',
      headerName: 'Organismo financiero',
      description: 'Organismo financiero',
      flex: 1,
      type: 'string',
    },
    {
      field: 'url',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => goToURL(params.row.url)} variant="contained">
          <Typography variant="body2">Ver Anuncio</Typography>
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
