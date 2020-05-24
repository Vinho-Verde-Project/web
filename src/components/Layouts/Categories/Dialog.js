import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Dialog as MaterialDialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  DialogActions,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
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
  initialCategory,
  dialog = false,
  setDialog = () => {},
  onSubmit = () => {},
}) {
  const defaultCategory = {
    title: "",
    type: "RAW",
    description: "",
    attributes: [
      {
        key: "",
        value: "",
      },
    ],
  };
  const classes = useStyles();
  const [category, setCategory] = useState(defaultCategory);

  // Setup Category on Edit or Create Mode
  useEffect(() => {
    if (!_.isEmpty(initialCategory)) {
      setCategory(initialCategory);
    } else {
      setCategory(defaultCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

  const handleSubmit = () => {
    onSubmit(category);
    setDialog(false);
    setCategory(defaultCategory);
  };

  return (
    <MaterialDialog
      open={dialog}
      onClose={() => setDialog(false)}
      aria-labelledby="category-dialog"
    >
      <DialogTitle id="category-dialog">
        {_.isEmpty(category.id) ? "Criar" : "Editar"} Categoria
      </DialogTitle>
      <DialogContent>
        <FormControl className={classes.input}>
          <TextField
            id="title"
            label="Titulo"
            style={{ width: "100%" }}
            placeholder="Garrafas"
            variant="outlined"
            value={category.title}
            onChange={({ target }) =>
              setCategory((state) => ({
                ...state,
                title: target.value,
              }))
            }
          />
        </FormControl>
        <FormControl className={classes.input}>
          <TextField
            id="desc"
            label="Descrição"
            placeholder="Garrafa utilizada para..."
            variant="outlined"
            value={category.description}
            onChange={({ target }) =>
              setCategory((state) => ({
                ...state,
                description: target.value,
              }))
            }
          />
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            id="type"
            labelId="type-label"
            value={category.type}
            variant="outlined"
            onChange={({ target }) =>
              setCategory((state) => ({
                ...state,
                type: target.value,
              }))
            }
          >
            <MenuItem value="RAW">Seco</MenuItem>
            <MenuItem value="WET">Molhado</MenuItem>
          </Select>
        </FormControl>
        {category.attributes.map(({ key, value }, index) => (
          <FormControl className={classes.inputGroup} key={index}>
            <TextField
              id="key"
              label="Atributo"
              placeholder="Volume"
              variant="outlined"
              value={key}
              onChange={({ target }) => {
                const { attributes } = category;
                attributes[index] = {
                  ...attributes[index],
                  key: target.value,
                };
                setCategory((state) => ({
                  ...state,
                  attributes: [...attributes],
                }));
              }}
            />
            <TextField
              id="value"
              label="Unidade"
              placeholder="Un."
              variant="outlined"
              value={value}
              onChange={({ target }) => {
                const { attributes } = category;
                attributes[index] = {
                  ...attributes[index],
                  value: target.value,
                };
                setCategory((state) => ({
                  ...state,
                  attributes: [...attributes],
                }));
              }}
            />
          </FormControl>
        ))}
        <div className={classes.button}>
          <IconButton
            onClick={() => {
              const { attributes } = category;
              attributes.pop();

              setCategory((state) => ({
                ...state,
                attributes: [...attributes],
              }));
            }}
          >
            <MinusIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              const { attributes } = category;
              attributes.push({ key: "", value: "" });
              setCategory((state) => ({
                ...state,
                attributes: [...attributes],
              }));
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
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
