import React, { useEffect, useState } from "react";
import {
  Section,
  SectionHeader,
  HeaderTitle,
} from "../components/Layouts/styles";
import {
  IconButton,
  TableContainer,
  Paper,
  makeStyles,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  DialogActions,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useStores from "../stores/useStores";
import { observer } from "mobx-react";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  head: {
    fontWeight: "bold",
  },
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

function Categories() {
  const [dialog, setDialog] = useState(false);
  const classes = useStyles();
  const { appStore } = useStores();

  useEffect(() => {
    appStore.fetchCategories();
  }, [appStore]);

  const onEdit = (id) => {
    console.log("onEdit", id);
  };

  const onDelete = (id) => {
    appStore.deleteCategory(id);
  };

  return (
    <>
      <Section>
        <SectionHeader justify="end">
          <HeaderTitle component="h2" variant="h4">
            Categorias
          </HeaderTitle>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-haspopup="true"
              color="primary"
              onClick={() => setDialog(true)}
            >
              <AddIcon />
            </IconButton>
          </div>
        </SectionHeader>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>Titulo</TableCell>
                <TableCell className={classes.head}>Descrição</TableCell>
                <TableCell className={classes.head}>Tipo</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appStore.categories.map(({ id, title, description, type }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {title}
                  </TableCell>
                  <TableCell>{description || <i>Sem descrição</i>}</TableCell>
                  <TableCell>{type}</TableCell>
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
          </Table>
        </TableContainer>
      </Section>

      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="category-dialog"
      >
        <DialogTitle id="category-dialog">Criar Nova Categoria</DialogTitle>
        <DialogContent>
          <FormControl className={classes.input}>
            <TextField
              id="title"
              label="Titulo"
              style={{ width: "100%" }}
              placeholder="Garrafas"
              variant="outlined"
            />
          </FormControl>
          <FormControl className={classes.input}>
            <TextField
              id="desc"
              label="Descrição"
              placeholder="Garrafa utilizada para..."
              variant="outlined"
            />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel id="type-label">Tipo</InputLabel>
            <Select
              id="type"
              labelId="type-label"
              value="raw"
              variant="outlined"
            >
              <MenuItem value="raw">Seco</MenuItem>
              <MenuItem value="wet">Molhado</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.inputGroup}>
            <TextField
              id="key"
              label="Atributo"
              placeholder="Volume"
              variant="outlined"
            />
            <TextField
              id="key"
              label="Unidade"
              placeholder="Un."
              variant="outlined"
            />
          </FormControl>
          <div className={classes.button}>
            <IconButton onClick={() => {}}>
              <AddIcon />
            </IconButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancelar</Button>
          <Button onClick={() => {}} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default observer(Categories);
