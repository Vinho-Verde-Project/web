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
    margin: 14,
  },
  inputGroup: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    margin: 14,
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
    type: "RAW",
  };
  const classes = useStyles();
  const [product, setProduct] = useState(defaultProduct);
  const [type, setType] = useState("");

  // Setup Products on Edit or Create Mode
  useEffect(() => {
    if (dialog && !_.isEmpty(initialProduct)) {
      setProduct(initialProduct);
      setType("EDIT");
    } else if (dialog) {
      setProduct(defaultProduct);
      setType("CREATE");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog, initialProduct]);

  const setCategory = ({ target }) => {
    const category = categories.find(({ id }) => id === target.value);

    setProduct((state) => ({
      ...state,
      category: {
        ...category,
      },
    }));
  };

  const handleSubmit = () => {
    onSubmit(type, product);
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
        {type === "CREATE" ? "Criar" : "Editar"} Produto
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
        <FormControl className={classes.input}>
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            id="type"
            labelId="type-label"
            value={product.type}
            variant="outlined"
            defaultValue="RAW"
            onChange={({ target }) =>
              setProduct((state) => ({
                ...state,
                type: target.value,
              }))
            }
          >
            <MenuItem value="RAW">Seco</MenuItem>
            <MenuItem value="WET">Molhado</MenuItem>
          </Select>
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
