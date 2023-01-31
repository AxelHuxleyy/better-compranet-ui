import React, { useState, FC } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { SingleFilterEnum } from 'enums';
import { setRequestValues } from 'pages/dashboardSlice';
import { Clear } from '@mui/icons-material';
import { getLabelSingleFilter } from 'constants/getLabel';

interface Props {
  removeItem: (item: number) => void;
  id: number;
}

export const SingleFilter: FC<Props> = (props) => {
  const { removeItem, id } = props;
  const licitacionesState = useAppSelector((x) => x.licitaciones);
  const { requestValues } = licitacionesState;
  const dispatch = useAppDispatch();
  const [key, setKey] = useState<string>('');

  const resetRequest = () => {
    const newObject = { ...requestValues };
    if (!requestValues) return;
    delete newObject[key as keyof typeof requestValues];
    dispatch(setRequestValues({ ...newObject }));
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (key !== '') resetRequest();
    setKey(event.target.value as string);
  };

  const settingValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRequestValues({
        ...requestValues,
        [key as keyof typeof requestValues]: event.target.value,
      }),
    );
  };

  const cleanFilter = () => {
    setKey('');
    resetRequest();
    removeItem(id);
  };

  const getItems = () => {
    if (!requestValues) {
      return Object.keys(SingleFilterEnum).map((x) => ({ label: x, disabled: false }));
    }
    const onlyAvailableValues = Object.keys(SingleFilterEnum).map((x) => {
      const isValueSelected = Object.keys(requestValues).includes(x);
      if (!isValueSelected) return { label: x, disabled: false };
      return { label: x, disabled: true };
    });
    return onlyAvailableValues ?? [];
  };

  return (
    <div className="flex flex-row gap-3 flex-4 items-center">
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel variant="standard">Filtro Individuales</InputLabel>
        <Select value={key} label="Filtro" onChange={handleChange} fullWidth variant="standard">
          {getItems().map((x) => (
            <MenuItem value={x.label ?? x} key={x.label ?? x} disabled={x.disabled}>
              {getLabelSingleFilter[(x.label ?? x) as keyof typeof getLabelSingleFilter] ?? 'value'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {key !== '' && <TextField label="Valor" onChange={settingValue} variant="standard" />}
      {key !== '' && <Clear onClick={cleanFilter} sx={{ cursor: 'pointer' }} />}
    </div>
  );
};
