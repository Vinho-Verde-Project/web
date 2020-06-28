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
  initialTask,
  dialog = false,
  setDialog = () => {},
  onSubmit = () => {},
}) {
  const defaultTask = {
    id: 0,
    startedAt: null,
    endedAt: null,
    status: "",
  };
  const classes = useStyles();
  const [Task, setTask] = useState(defaultTask);
  const [type, setType] = useState("");

  // Setup Task on Edit or Create Mode
  useEffect(() => {
    if (dialog && !_.isEmpty(initialTask)) {
      setTask(initialTask);
      setType("EDIT");
    } else if (dialog) {
      setTask(defaultTask);
      setType("CREATE");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog, initialTask]);

  const handleSubmit = () => {
    onSubmit(type, Task);
    setDialog(false);
    setTask(defaultTask);
  };

  return (
    <MaterialDialog
      open={dialog}
      onClose={() => setDialog(false)}
      aria-labelledby="Task-dialog"
    >
      <DialogTitle id="Task-dialog">
        {type === "CREATE" ? "Criar" : "Editar"} Tarefa
      </DialogTitle>
      <DialogContent>
        <FormControl className={classes.input}>
            <TextField
                margin="dense"
                id="dini"
                label="Data e Hora de Início"
                type="datetime-local"
                placeholder="Data e Hora de Início"
                fullWidth
                onChange={({target}) =>
                    setTask((state) => ({
                        ...state,
                        startedAt: target.value,
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
                id="dfim"
                label="Data e Hora de Término"
                type="datetime-local"
                placeholder="Data e Hora de Término"
                fullWidth
                onChange={({target}) =>
                    setTask((state) => ({
                        ...state,
                        endedAt: target.value,
                }))
                }
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </FormControl>
        <FormControl className={classes.input}>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
            Status
            </InputLabel>
            <Select
                fullWidth
                native
                variant="standard"
                onChange={({ target }) =>
                    setTask((state) => ({
                        ...state,
                        status: target.value,
                    }))
                }
                defaultValue={""}
                inputProps={{
                    name: "key",
                    id: "standard-key-native-simple",
                }}
            >
                <option key={0} value={""}>
                    Select
                </option>
                <option key={1} value={"active"}>
                    Active
                </option>
                <option key={2} value={"inactive"}>
                    Inactive
                </option>
                <option key={3} value={"finished"}>
                    Finished
                </option>
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