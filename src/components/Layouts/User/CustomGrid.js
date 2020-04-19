import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import { Data } from "react-data-grid-addons";
import {Typography, Grid, Box, FormControl, TextField, InputAdornment, InputLabel, Select } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const selectors = Data.Selectors;

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

export default function CustomGrid({columns = [], rows = [], title, ...props}) {

  const [search, setSearch] = useState('');
  
  const [searchFilter, setsearchFilter] = useState({
    key: Object.values(columns)[0].key,
    name: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setsearchFilter({
      ...searchFilter,
      [name]: event.target.value,
    });
    props.defaultSearch && event.target.value !== 'name' ? setSearch(props.defaultSearch) : setSearch('');
    setFilters({});
  };
  

  React.useEffect(() => {
      setFilters(handleFilterChange( { filterTerm: search, column: {key: searchFilter.key} } ));
    }, [search,searchFilter]);

  const handleInput = e => {
    setSearch(e.target.value);
  };

  function CustomToolbar() {
      return (
        <Grid container alignItems="center" justify="space-between">
        <Grid item>
        <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item>
        <Grid container direction="row" alignItems="center">
          <Box mb={2}>
          <TextField id="outlined-search" size="small" label="Search field" InputProps={{ value: search , onChange: e=>handleInput(e) ,  startAdornment: ( <InputAdornment position="start"><SearchOutlinedIcon/></InputAdornment>)}} type="search" variant="outlined" />
          </Box>
          <Box mb={2} ml={2} mr={2}>
          <FormControl variant="standard">
          <InputLabel htmlFor="standard-key-native-simple">Filter By</InputLabel>
          <Select
            native 
            variant='standard'
            value={searchFilter.key}
            onChange={handleChange}
            inputProps={{
              name: 'key',
              id: 'standard-key-native-simple',
            }}
          >
            {columns.map(column => (
              (column.key !== 'actions' ? <option key={column.key} value={column.key}>{ Object.getPrototypeOf(column.name).isPrototypeOf(Object) ? column.name.props.children : column.name  }</option> : null)
            ))}
          </Select>
          </FormControl>
          </Box>
        </Grid>
        </Grid>
        </Grid>
      )
  }

  function getCellActions(column, row) {
    const cellActions = {
      actions:  [{ icon: <span  style={{cursor: 'pointer'}}><DeleteForeverOutlinedIcon/></span>, callback: () => { props.handleRemove(row); }}, { icon: <span style={{cursor: 'pointer'}}><EditOutlinedIcon/></span>, callback: () => { props.handleEdit(row); }}],
    };
    return cellActions[column.key];
  }
  
  columns = columns.map(c => ({ ...c, filterable: true }));

  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);

  return (
  <ReactDataGrid
  columns={columns}
  rowGetter={i => filteredRows[i]}
  rowsCount={rows.length}
  onAddFilter={filter => setFilters(handleFilterChange(filter))}
  onClearFilters={() => setFilters({})}
  enableCellAutoFocus={false}
  getCellActions={getCellActions}
  toolbar={<CustomToolbar />}
  minHeight={500} />
  );
}