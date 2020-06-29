import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Dialog as MaterialDialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  TextField,
  InputLabel,
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
  initialTasks,
  initialCategories,
  initialWine,
  dialog = false,
  setDialog = () => {},
  onSubmit = () => {},
}) {
  const defaultWine = {
    id: 0,
    batch: "",
    productionDate: null,
    shelfLife: null,
    categoryId: -1,
    taskId: -1,
  };
  const classes = useStyles();
  const [Wine, setWine] = useState(defaultWine);
  const [type, setType] = useState("");

  // Setup Wine on Edit or Create Mode
  useEffect(() => {
    if (dialog && !_.isEmpty(initialWine)) {
      setWine(initialWine);
      setType("EDIT");
    } else if (dialog) {
      setWine(defaultWine);
      setType("CREATE");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog, initialWine]);

  const handleSubmit = () => {
    onSubmit(type, Wine);
    setDialog(false);
    setWine(defaultWine);
  };

  return (
    <MaterialDialog
      open={dialog}
      onClose={() => setDialog(false)}
      aria-labelledby="Wine-dialog"
    >
      <DialogTitle id="Wine-dialog">
        {type === "CREATE" ? "Criar" : "Editar"} Vinho
      </DialogTitle>
      <DialogContent>
        <FormControl className={classes.input}>
          <TextField
            id="batch"
            label="Batch"
            style={{ width: "100%" }}
            placeholder="Batch"
            variant="outlined"
            value={Wine.batch}
            onChange={({ target }) =>
              setWine((state) => ({
                ...state,
                batch: target.value,
              }))
            }
          />
        </FormControl>
        <FormControl className={classes.input}>
            <TextField
                margin="dense"
                id="productionDate"
                label="Production Date"
                type="datetime-local"
                placeholder="Production Date"
                fullWidth
                onChange={({target}) =>
                    setWine((state) => ({
                        ...state,
                        productionDate: target.value,
                }))
                }
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </FormControl>
        <FormControl className={classes.input}>
            <TextField
                margin="dense"
                id="shelfLife"
                label="Shelf Life"
                type="date"
                placeholder="Shelf Life"
                fullWidth
                onChange={({target}) =>
                    setWine((state) => ({
                        ...state,
                        shelfLife: target.value,
                }))
                }
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </FormControl>
        <FormControl className={classes.input}>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
            Select Category
            </InputLabel>
            <Select
                fullWidth
                native
                variant="standard"
                onChange={({ target }) =>
                    setWine((state) => ({
                        ...state,
                        categoryId: target.value,
                    }))
                }
                defaultValue={""}
                inputProps={{
                    name: "key",
                    id: "standard-key-native-simple",
                }}
            >
                <option key={-1} value={-1}>
                    Select
                </option>
                {initialCategories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.title}
                </option>
                ))}
            </Select>
        </FormControl>
        <FormControl className={classes.input}>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
            Select Task
            </InputLabel>
            <Select
                fullWidth
                native
                variant="standard"
                onChange={({ target }) =>
                    setWine((state) => ({
                        ...state,
                        taskId: target.value,
                    }))
                }
                defaultValue={""}
                inputProps={{
                    name: "key",
                    id: "standard-key-native-simple",
                }}
            >
                <option key={-1} value={-1}>
                    Select
                </option>
                {initialTasks.map((task) => (
                <option key={task.id} value={task.id}>
                     ID: {task.id} - Started: {task.startedAt} ({task.status})
                </option>
                ))}
            </Select>
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