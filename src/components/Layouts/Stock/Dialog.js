import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Dialog as MaterialDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles({
  input: {
    display: "flex",
    flex: 1,
    margin: "14px",
  },
  inputGroup: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    margin: "14px",
  },
  button: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
});

export default function Dialog({
  categories,
  initialStock,
  onSubmit = () => {},
  dialog = false,
  setDialog = () => {},
}) {
  const defaultStock = {
    title: "",
    type: "",
    quantity: "",
    unity: "",
    warehouse: "",
    entryDate: new Date().toLocaleString(),
    employee: "",
  };
  const classes = useStyles();
  const [stock, setStock] = useState(defaultStock);

  // Setup Category on Edit or Create Mode
  useEffect(() => {
    if (!_.isEmpty(initialStock)) {
      setStock(initialStock);
    } else {
      setStock(defaultStock);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStock]);

  const setCategory = ({ target }) => {
    setStock((state) => ({
      ...state,
      type: target.value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(stock);
    setDialog(false);
    setStock(defaultStock);
  };

  return (
    <MaterialDialog
      open={dialog}
      onClose={() => setDialog(false)}
      aria-labelledby="stock-dialog"
    >
      <DialogTitle id="stock-dialog">
        {_.isEmpty(stock.id) ? "Novo" : "Editar"} Estoque
      </DialogTitle>
      <DialogContent>
        <FormControl className={classes.input}>
          <TextField
            id="title"
            label="Titulo"
            style={{ width: "100%" }}
            placeholder="Garrafas"
            variant="outlined"
            value={stock.title}
            onChange={({ target }) =>
              setStock((state) => ({
                ...state,
                title: target.value,
              }))
            }
          />
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            id="type"
            labelId="type-label"
            variant="outlined"
            value={stock.type}
            onChange={setCategory}
            disabled={_.isEmpty(stock.id) ? false : true}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.inputGroup}>
          <TextField
            id="quantity"
            label="Quantidade"
            placeholder="0"
            variant="outlined"
            type="number"
            value={stock.quantity}
            onChange={({ target }) => {
              setStock((state) => ({
                ...state,
                quantity: target.value,
              }));
            }}
          />
          <TextField
            id="unity"
            label="Unidade"
            placeholder="Un."
            variant="outlined"
            value={stock.unity}
            onChange={({ target }) => {
              setStock((state) => ({
                ...state,
                unity: target.value,
              }));
            }}
          />
        </FormControl>

        <FormControl className={classes.input}>
          <TextField
            id="warehouse"
            label="Armazém"
            style={{ width: "100%" }}
            placeholder="Nome do Armazém"
            variant="outlined"
            value={stock.warehouse}
            onChange={({ target }) =>
              setStock((state) => ({
                ...state,
                warehouse: target.value,
              }))
            }
          />
        </FormControl>

        <FormControl className={classes.input}>
          <TextField
            id="entryDate"
            label="Data de Entrada"
            style={{ width: "100%" }}
            placeholder="Data de Entrada (dd/mm/yyyy hh:mm:ss)"
            variant="outlined"
            value={stock.entryDate}
            onChange={({ target }) =>
              setStock((state) => ({
                ...state,
                entryDate: target.value,
              }))
            }
          />
        </FormControl>

        <FormControl className={classes.input}>
          <TextField
            id="employee"
            label="Funcionario"
            style={{ width: "100%" }}
            placeholder="Funcionário"
            variant="outlined"
            value={stock.employee}
            onChange={({ target }) =>
              setStock((state) => ({
                ...state,
                employee: target.value,
              }))
            }
          />
        </FormControl>
        

      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={() => setDialog(false)}>
          Cancelar
        </Button>
        <Button size="large" onClick={handleSubmit} color="primary">
          Criar
        </Button>
      </DialogActions>
    </MaterialDialog>
  );
}
