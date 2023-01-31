import React, { useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { FilterOptions } from 'interfaces';
import { getLabel } from 'constants/getLabel';
import { SingleFilterEnum } from 'enums';
import { Button } from '@mui/material';
import { GroupFilter } from './GroupFilter';
import { SingleFilter } from './SingleFilter';

export const Filters = () => {
  const stateLicitaciones = useAppSelector((x) => x.licitaciones);
  const { options: values, requestValues } = stateLicitaciones;
  const [numberInputs, setNumberInputs] = useState<Array<number>>([0]);

  const existKey = () => {
    if (!requestValues) return false;
    const keys = Object.keys(requestValues);
    const singleFilterKeys = Object.keys(SingleFilterEnum);
    const value = keys.some((x) => singleFilterKeys.includes(x));
    return value;
  };

  const addNewItem = () => {
    setNumberInputs([...numberInputs, numberInputs.length]);
  };

  const settingUPData = (): Array<FilterOptions> => {
    if (!values) return [];
    const data = Object.keys(values).map((key) => {
      if (!key) return { category: '', values: [], isOpen: false, textSearch: '', label: '' };
      const formatValues =
        values[key as keyof typeof values]?.map((x) => ({ value: x, checked: false })) ?? [];
      return {
        category: key ?? '',
        values: formatValues,
        isOpen: false,
        textSearch: '',
        label: getLabel[key as keyof typeof getLabel] ?? '',
      };
    });

    return data;
  };

  const onRemoveInput = (index: number) => {
    if (numberInputs.length === 1) return;
    const newData = numberInputs.filter((x) => x !== index);
    setNumberInputs(newData);
  };

  return (
    <div className="flex flex-row items-center gap-5  flex-4 ">
      {existKey() && numberInputs.length < 4 && (
        <Button variant="contained" onClick={addNewItem}>
          + Filter
        </Button>
      )}
      {numberInputs.map((x) => (
        // eslint-disable-next-line react/no-array-index-key
        <SingleFilter key={x} removeItem={onRemoveInput} id={x} />
      ))}
      <GroupFilter data={settingUPData()} />
    </div>
  );
};
