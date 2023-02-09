import React, { useState, FC, useEffect } from 'react';
import {
  Button,
  Menu,
  Fade,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { FilterOptions } from 'interfaces/filterOptions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch } from 'hooks/redux';
import { setGroupFilter } from 'pages';
import { DistinctOptions } from 'interfaces/distinctOptions';
import { upperFirst } from 'utils/helpers';

interface Props {
  data: Array<FilterOptions>;
}

export const GroupFilter: FC<Props> = (props) => {
  const { data } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dataConfig, setDataConfig] = useState<Array<FilterOptions>>(data);
  const [finalValues, setFinalValues] = useState<DistinctOptions>({});
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dataConfig) return;
    const getInformation = dataConfig.map((x) => {
      const checked = x?.values?.filter((y) => y.checked === true);
      const onlyValues = checked?.map((z) => z.value);
      if (onlyValues && onlyValues.length > 0) return { [x.category]: [...onlyValues] };
      return undefined;
    });

    const onlyValidValues = getInformation.filter((x) => x !== undefined);
    const arrayToJson: DistinctOptions = Object.assign({}, ...onlyValidValues);
    setFinalValues(arrayToJson);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataConfig]);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const applyFilters = () => {
    dispatch(setGroupFilter({ ...finalValues }));
    handleClose();
  };

  const resetFilter = () => {
    setDataConfig(data);
  };

  const getTotal = () => {
    if (!finalValues) return 0;
    const total = Object.values(finalValues).reduce((a, b) => a + b.length, 0);
    return total;
  };

  const getTotalByCategory = (category: string) => {
    if (!finalValues) return 0;
    const total = finalValues[category as keyof DistinctOptions]?.length;
    return total ?? 0;
  };

  const getDataCategory = (category: string) => dataConfig.find((x) => x.category === category);

  const updateData = (category: string, newConfig: FilterOptions) => {
    const newData = dataConfig.map((x) => {
      if (x.category === category) {
        return { ...newConfig };
      }
      return x;
    });
    setDataConfig(newData);
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

  const isMoreThanFive = (category: string) => {
    const dataByCategory = getDataCategory(category);
    if (!dataByCategory?.values) return false;
    if (dataByCategory.values.length > 5) return true;
    return false;
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
          <VisibilityIcon sx={{ color: '#1976d2' }} />
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

  const getLabel = (str: string) => {
    if (!str) return '';
    if (str === 'true') return 'Si';
    if (str === 'false') return 'No';
    if (str.length <= 4) return str.toUpperCase();
    return upperFirst(str);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openMenu}
        variant="contained"
        sx={{ height: '100%' }}
        color="secondary"
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
        <div className="w-96 inline-block rounded-md h-96 p-0 overflow-auto">
          <div className="sticky top-0 bg-white p-3 z-10">
            <div className=" flex flex-row justify-between items-center">
              <h1 className="text-xl font-semibold">{`Filtros (${getTotal()})`}</h1>
              <div className="flex flex-row gap-2">
                <Button onClick={resetFilter} variant="contained" size="small" color="warning">
                  Reset
                </Button>
                <Button onClick={applyFilters} variant="contained" size="small" color="info">
                  Aplicar
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {dataConfig.map((value) => (
              <div className="flex flex-col bg-gray-50 gap-2 " key={value.category}>
                <h1 className="text-lg font-semibold ">{`${value.label} (${getTotalByCategory(
                  value.category,
                )})`}</h1>
                {isMoreThanFive(value.category) && (
                  <TextField
                    label={`Buscar ${value.label}`}
                    variant="standard"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSearch(value.category, e)
                    }
                  />
                )}
                <div className="flex flex-col gap-1">
                  <FormGroup>
                    {showData(value.category).map((x, index) => (
                      <FormControlLabel
                        // eslint-disable-next-line react/no-array-index-key
                        key={`key-group-filter-${x.value}-${index}`}
                        control={
                          <Checkbox
                            checked={x.checked}
                            onChange={() => handleCheck(value.category, x.value)}
                          />
                        }
                        label={getLabel(x.value)}
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
