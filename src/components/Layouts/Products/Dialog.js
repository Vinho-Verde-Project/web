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
  categories = [],
  initialProduct,
  onSubmit = () => {},
  dialog = false,
  setDialog = () => {},
}) {
  const defaultProduct = {
    title: "",
    category: {
      id: "",
    },
    quantity: "",
    unity: "",
    attributes: [],
  };
  const classes = useStyles();
  const [product, setProduct] = useState(defaultProduct);

  // Setup Category on Edit or Create Mode
  useEffect(() => {
    if (!_.isEmpty(initialProduct)) {
      setProduct(initialProduct);
    } else {
      setProduct(defaultProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProduct]);

  const setCategory = ({ target }) => {
    const category = categories.find(({ id }) => id === target.value);
    const attributes = category.attributes.map((attribute) => ({
      attribute,
      value: "",
    }));

    setProduct((state) => ({
      ...state,
      category: {
        ...category,
      },
      attributes: [...attributes],
    }));
  };

  const handleSubmit = () => {
    onSubmit(product);
    setDialog(false);
    setProduct(defaultProduct);
  };

  return (
    <MaterialDialog
      open={dialog}
      onClose={() => setDialog(false)}
      aria-labelledby="product-dialog"
    >
      <DialogTitle id="product-dialog">
        {_.isEmpty(product.id) ? "Criar" : "Editar"} Produto
      </DialogTitle>
      <DialogContent>
        <FormControl className={classes.input}>
          <TextField
            id="title"
            label="Titulo"
            style={{ width: "100%" }}
            placeholder="Garrafas"
            variant="outlined"
            value={product.title}
            onChange={({ target }) =>
              setProduct((state) => ({
                ...state,
                title: target.value,
              }))
            }
          />
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel id="type-label">Categoria</InputLabel>
          <Select
            id="type"
            labelId="type-label"
            variant="outlined"
            value={product.category.id}
            onChange={setCategory}
          >
            {categories.map(({ id, title }) => (
              <MenuItem key={id} value={id}>
                {title}
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
            value={product.quantity}
            onChange={({ target }) => {
              setProduct((state) => ({
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
            value={product.unity}
            onChange={({ target }) => {
              setProduct((state) => ({
                ...state,
                unity: target.value,
              }));
            }}
          />
        </FormControl>
        {!_.isEmpty(product.attributes) &&
          product.attributes.map(({ attribute, value }, index) => (
            <FormControl key={index} className={classes.input}>
              <TextField
                id={"attribute" + index}
                label={attribute.key}
                placeholder={attribute.value}
                variant="outlined"
                value={product.attributes[index].value}
                onChange={({ target }) => {
                  const { attributes } = product;
                  attributes[index] = {
                    ...attributes[index],
                    value: target.value,
                  };

                  setProduct((state) => ({
                    ...state,
                    attributes: [...attributes],
                  }));
                }}
              />
            </FormControl>
          ))}
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
