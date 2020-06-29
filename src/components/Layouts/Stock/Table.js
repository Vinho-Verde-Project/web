import React from "react";
import {
  Table as MaterialTable,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  head: {
    fontWeight: "bold",
  },
});

export default function Table({ stocks = [] }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <MaterialTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.head}>Produto</TableCell>
            <TableCell className={classes.head}>Armazém</TableCell>
            <TableCell className={classes.head}>Quantidade</TableCell>
            <TableCell className={classes.head}>Data de Entrada</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map(
            ({
              id,
              product,
              warehouse,
              quantity = 0,
              unity = "Un",
              type,
              entryDate,
            }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {type === "PRODUCT" ? product.title : product.batch}
                </TableCell>
                <TableCell>{warehouse.id}</TableCell>
                <TableCell>
                  {quantity}&nbsp;
                  <small>{unity}</small>
                </TableCell>
                <TableCell>{entryDate}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
}
