import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Dialog as MaterialDialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import _ from "lodash";
import { observer } from "mobx-react";

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

function Dialog({
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
  const [type, setType] = useState("");

  // Setup Category on Edit or Create Mode
  useEffect(() => {
    if (dialog && !_.isEmpty(initialCategory)) {
      setCategory(initialCategory);
      setType("EDIT");
    } else if (dialog) {
      setCategory(defaultCategory);
      setType("CREATE");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog, initialCategory]);

  const handleSubmit = () => {
    onSubmit(type, category);
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
        {type === "CREATE" ? "Criar" : "Editar"} Categoria
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

export default observer(Dialog);
