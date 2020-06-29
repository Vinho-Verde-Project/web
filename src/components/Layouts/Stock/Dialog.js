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
  warehouses = [],
  products = [],
  wines = [],
  initialStock,
  onSubmit = () => {},
  dialog = false,
  setDialog = () => {},
}) {
  const defaultStock = {
    id: "",
    product: {
      id: "",
    },
    warehouse: {
      id: "",
    },
    type: "PRODUCT",
    minQuantity: 0,
    quantity: 0,
    unity: "Un",
    entryDate: new Date().toLocaleString(),
    employee: localStorage.getItem('WinnerUserID'),
  };
  const classes = useStyles();
  const [stock, setStock] = useState(defaultStock);
  const [type, setType] = useState("");

  useEffect(() => {
    if (dialog && !_.isEmpty(initialStock)) {
      setStock(initialStock);
      setType("EDIT");
    } else if (dialog) {
      setStock(defaultStock);
      setType("CREATE");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog, initialStock]);

  const handleSubmit = () => {
    onSubmit(type, stock);
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
        {type === "CREATE" ? "Criar" : "Editar"} Item em Estoque
      </DialogTitle>
      <DialogContent>
        <FormControl className={classes.input}>
          <InputLabel id="warhouse-label">Armazém</InputLabel>
          <Select
            id="warhouse"
            labelId="warhouse-label"
            variant="outlined"
            value={stock.warehouse.id}
            onChange={({ target }) =>
              setStock((state) => ({
                ...state,
                warehouse: { id: target.value },
              }))
            }
          >
            {warehouses.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.input}>
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            id="type"
            labelId="type-label"
            variant="outlined"
            value={stock.type}
            onChange={({ target }) =>
              setStock((state) => ({
                ...state,
                type: target.value,
              }))
            }
          >
            <MenuItem value="PRODUCT">Produto</MenuItem>
            <MenuItem value="WINE">Vinho</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.input}>
          <InputLabel id="product-label">
            {stock.type === "WINE" ? "Vinho" : "Produto"}
          </InputLabel>
          <Select
            id="product"
            labelId="product-label"
            variant="outlined"
            value={stock.product.id}
            onChange={({ target }) =>
              setStock((state) => ({
                ...state,
                product: { id: target.value },
              }))
            }
          >
            {stock.type === "WINE" &&
              wines.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.batch}
                </MenuItem>
              ))}
            {stock.type === "PRODUCT" &&
              products.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
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
            id="minquantity"
            label="Quantidade Minima"
            placeholder="0"
            variant="outlined"
            type="number"
            value={stock.minQuantity}
            onChange={({ target }) => {
              setStock((state) => ({
                ...state,
                minQuantity: target.value,
              }));
            }}
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
            inputProps={{ readOnly: true }}
            defaultValue={localStorage.getItem('WinnerUserID')+" - "+localStorage.getItem('WinnerUserName')}
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
          {type === "CREATE" ? "Criar" : "Editar"}
        </Button>
      </DialogActions>
    </MaterialDialog>
  );
}
