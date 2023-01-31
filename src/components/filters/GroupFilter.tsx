import React, { useState, FC } from 'react';
import {
  Button,
  Menu,
  Fade,
  Divider,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { FilterOptions } from 'interfaces/filterOptions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setRequestValues } from 'pages';
import { RequestValues } from 'interfaces/requestValues';

interface Props {
  data: Array<FilterOptions>;
}

export const GroupFilter: FC<Props> = (props) => {
  const { data } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dataConfig, setDataConfig] = useState<Array<FilterOptions>>(data);
  const open = Boolean(anchorEl);
  const licitacionesState = useAppSelector((x) => x.licitaciones);
  const { requestValues } = licitacionesState;
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const applyFilters = () => {
    const getInformation = dataConfig.map((x) => {
      const checked = x?.values?.filter((y) => y.checked);
      const onlyValues = checked?.map((z) => z.value);
      if (onlyValues && onlyValues.length > 0) return { [x.category]: [...onlyValues] };
      return undefined;
    });

    const onlyValidValues = getInformation.filter((x) => x !== undefined);
    const arrayToJson: RequestValues = Object.assign({}, ...onlyValidValues);
    dispatch(setRequestValues({ ...requestValues, ...arrayToJson }));
    handleClose();
  };

  const resetFilter = () => {
    setDataConfig(data);
  };

  const getDataCategory = (category: string) => dataConfig.find((x) => x.category === category);

  const isMoreThanFive = (category: string) => {
    const dataByCategory = getDataCategory(category);
    if (!dataByCategory?.values) return false;
    if (dataByCategory.values.length > 5) return true;
    return false;
  };

  const showData = (category: string) => {
    const dataByCategory = getDataCategory(category);
    if (!dataByCategory?.values) return [];
    if (dataByCategory.textSearch !== '') {
      const newData = dataByCategory.values.filter((x) =>
        x.value.toLowerCase().includes(dataByCategory.textSearch.toLowerCase()),
      );
      if (dataByCategory.isOpen) return newData;
      if (!dataByCategory.isOpen) return newData.slice(0, 5);
    }
    if (dataByCategory.isOpen) return dataByCategory.values;
    if (!dataByCategory.isOpen) return dataByCategory.values.slice(0, 5);
    return [];
  };

  const updateData = (category: string, newConfig: FilterOptions) => {
    const newData = dataConfig.map((x) => {
      if (x.category === category) {
        return { ...newConfig };
      }
      return x;
    });
    setDataConfig(newData);
  };

  const handleSearch = (category: string, value: React.ChangeEvent<HTMLInputElement>) => {
    const dataByCategory = getDataCategory(category);
    if (!dataByCategory) return;
    updateData(category, { ...dataByCategory, textSearch: value.target.value });
  };

  const handleShowMore = (category: string) => {
    const dataByCategory = getDataCategory(category);
    if (!dataByCategory) return;
    updateData(category, { ...dataByCategory, isOpen: !dataByCategory.isOpen });
  };

  const getShowMore = (category: string) => {
    const dataByCategory = getDataCategory(category);
    if (!dataByCategory?.values) return null;
    if (dataByCategory.values.length <= 5) return null;
    if (dataByCategory.isOpen) {
      return (
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => handleShowMore(category)}
        >
          <h1 className="text-lg" style={{ color: '#1976d2' }}>
            Ver menos
          </h1>
          <VisibilityIcon />
        </div>
      );
    }
    if (!dataByCategory.isOpen) {
      return (
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => handleShowMore(category)}
        >
          <h1 className="text-lg" style={{ color: '#1976d2' }}>
            Ver mas
          </h1>
          <VisibilityIcon />
        </div>
      );
    }
    return null;
  };

  const handleCheck = (category: string, value: string) => {
    const dataByCategory = getDataCategory(category);
    if (!dataByCategory?.values) return;
    const newData = dataByCategory.values.map((x) => {
      if (x.value === value) {
        return { ...x, checked: !x.checked };
      }
      return x;
    });
    updateData(category, { ...dataByCategory, values: newData });
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        sx={{ height: '100%' }}
      >
        Filtrar Por Grupo
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <div className="w-96 p-2 flex flex-col gap-3 rounded-md max-h-96">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-semibold">Filtros</h1>
            <div className="flex flex-row gap-2">
              <Button onClick={resetFilter}>Reset</Button>
              <Button onClick={applyFilters}>Aplicar</Button>
            </div>
          </div>
          <Divider variant="fullWidth" />
          <div className="flex flex-col gap-3">
            {dataConfig.map((value) => (
              <div className="flex flex-col bg-gray-50 gap-2 " key={value.category}>
                <h1 className="text-lg font-semibold ">{value.label}</h1>
                {isMoreThanFive(value.category) && (
                  <TextField
                    label="Buscar dato"
                    variant="standard"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSearch(value.category, e)
                    }
                  />
                )}
                <div className="flex flex-col gap-1">
                  <FormGroup>
                    {showData(value.category).map((x) => (
                      <FormControlLabel
                        key={x.value}
                        control={
                          <Checkbox
                            checked={x.checked}
                            onChange={() => handleCheck(value.category, x.value)}
                          />
                        }
                        label={x.value ?? ''}
                      />
                    ))}
                  </FormGroup>
                </div>
                {getShowMore(value.category)}
              </div>
            ))}
          </div>
        </div>
      </Menu>
    </div>
  );
};
