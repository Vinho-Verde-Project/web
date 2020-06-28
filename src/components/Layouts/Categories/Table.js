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

export default function Table({ categories = [], onEdit, onDelete }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <MaterialTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.head}>Titulo</TableCell>
            <TableCell className={classes.head}>Descrição</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(({ id, title, description }) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {title}
              </TableCell>
              <TableCell>{description || <i>Sem descrição</i>}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
}
