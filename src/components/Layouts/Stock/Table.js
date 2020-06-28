import React from "react";
import {
  Table as MaterialTable,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  head: {
    fontWeight: "bold",
  },
});

export default function Table({ stocks = [], onEdit, onDelete }) {
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
            <TableCell></TableCell>
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
              entryDate,
            }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {product.title}
                </TableCell>
                <TableCell>{warehouse.title}</TableCell>
                <TableCell>
                  {quantity}&nbsp;
                  <small>{unity}</small>
                </TableCell>
                <TableCell>{entryDate}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
}
