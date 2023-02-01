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
import { setSingleFilter } from 'pages/dashboardSlice';
import { Clear } from '@mui/icons-material';
import { getLabelSingleFilter } from 'constants/getLabel';

interface Props {
  removeItem: (item: number) => void;
  id: number;
}

export const SingleFilter: FC<Props> = (props) => {
  const { removeItem, id } = props;
  const licitacionesState = useAppSelector((x) => x.licitaciones);
  const { singleFilter } = licitacionesState;
  const dispatch = useAppDispatch();
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const resetRequest = () => {
    const newObject = { ...singleFilter };
    if (!singleFilter) return;
    delete newObject[key as keyof typeof singleFilter];
    dispatch(setSingleFilter({ ...newObject }));
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (key !== '') resetRequest();
    setKey(event.target.value as string);
  };

  const settingValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (text.trim() === '' && value === '') return;
    setValue(text);
    dispatch(
      setSingleFilter({
        ...singleFilter,
        [key as keyof typeof singleFilter]: event.target.value,
      }),
    );
  };

  const cleanFilter = () => {
    setKey('');
    setValue('');
    resetRequest();
    removeItem(id);
  };

  const getItems = () => {
    if (!singleFilter) {
      return Object.keys(SingleFilterEnum).map((x) => ({ label: x, disabled: false }));
    }
    const onlyAvailableValues = Object.keys(SingleFilterEnum).map((x) => {
      const isValueSelected = Object.keys(singleFilter).includes(x);
      if (!isValueSelected) return { label: x, disabled: false };
      return { label: x, disabled: true };
    });
    return onlyAvailableValues ?? [];
  };

  return (
    <div className="flex flex-row gap-3 flex-4 items-center">
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel variant="standard">Filtrar Por:</InputLabel>
        <Select value={key} label="Filtro" onChange={handleChange} fullWidth variant="standard">
          {getItems().map((x) => (
            <MenuItem value={x.label ?? x} key={x.label ?? x} disabled={x.disabled}>
              {getLabelSingleFilter[(x.label ?? x) as keyof typeof getLabelSingleFilter] ?? 'value'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {key !== '' && (
        <TextField label="Buscar" onChange={settingValue} variant="standard" value={value} />
      )}
      {key !== '' && <Clear onClick={cleanFilter} sx={{ cursor: 'pointer' }} />}
    </div>
  );
};
