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
  initialWarehouse,
  dialog = false,
  setDialog = () => {},
  onSubmit = () => {},
}) {
  const defaultWarehouse = {
    id: "",
    title: "",
    entryDate: "",
    employee: {
      id: "",
    },
  };
  const classes = useStyles();
  const [warehouse, setWarehouse] = useState(defaultWarehouse);
  const [type, setType] = useState("");

  useEffect(() => {
    if (dialog && !_.isEmpty(initialWarehouse)) {
      setWarehouse(initialWarehouse);
      setType("EDIT");
    } else if (dialog) {
      setWarehouse(defaultWarehouse);
      setType("CREATE");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog, initialWarehouse]);

  const handleSubmit = () => {
    onSubmit(type, warehouse);
    setDialog(false);
    setWarehouse(defaultWarehouse);
  };

  return (
    <MaterialDialog
      open={dialog}
      onClose={() => setDialog(false)}
      aria-labelledby="warehouse-dialog"
    >
      <DialogTitle id="warehouse-dialog">
        {type === "CREATE" ? "Criar" : "Editar"} Armazém
      </DialogTitle>

      <DialogContent>
        <FormControl className={classes.input}>
          <TextField
            id="title"
            label="Titulo"
            style={{ width: "100%" }}
            placeholder="Armazém A"
            variant="outlined"
            value={warehouse.title}
            onChange={({ target }) =>
              setWarehouse((state) => ({
                ...state,
                title: target.value,
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
