import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import useStores from "../stores/useStores";
import { observer } from "mobx-react";
import api from "../services/api";
import CustomDialog from "../components/Layouts/Wine/Dialog";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = makeStyles((theme) => ({
  styles: {
    color: "#ff0000",
    width: "100%",
  },
  root: {
    flexGrow: 1,
  },
  paper2: {
    color: '#DCDCDC',
    opacity: 0.2,
  }
}));

function Wines() {
    const { appStore } = useStores();
    const [dialog, setDialog] = useState(false);

    // Fetch Wines
    useEffect(() => {
      appStore.fetchWines();
      appStore.fetchCategories();
      appStore.fetchTasks();
    }, [appStore]);
  
    // Clear Wine Selection
    useEffect(() => {
      if (!dialog) {
        appStore.clearSelectedWine();
      }
    }, [dialog, appStore]);
  
    const onSubmit = (type, wine) => {
      if (type === "CREATE") {
        appStore.createWine(wine);
      } else {
        //appStore.editWine(wine);
      }
      appStore.clearSelectedWine();
    };
  
    const onEdit = (id) => {
      appStore.setSelectedCategory(id);
      setDialog(true);
    };
  
    const onDelete = (id) => {
      appStore.deleteWine(id);
    };
  
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [wineDetail, setWineDetail] = useState(null);

  function viewDetails(id) {

    const body = {
      query: `{
        wine (id:${id}) { 
          id 
          batch
          productionDate
          shelfLife
          stockWine {
            quantity
            entryDate
            employee {
                firstName
                lastName
              }
            stock {
              id
              title             
            }
          }
          category {
            id
            desc
            characteristics
          }
          task {
            id
            startedAt
            endedAt
            status
          }
        }
      }`,
    };
  
    api
      .post("/", body)
      .then(({ data }) => {
        const { wine } = data;
        setWineDetail(wine);
        setDetailDialogOpen(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.root}>
      <Grid container justify="center" spacing={3}>
        <Grid container item xs={11} spacing={3}>
          <Grid item container xs={12} justify="flex-end">
              <Box p={1}>
                <IconButton
                aria-label="account of current user"
                aria-haspopup="true"
                color="primary"
                onClick={() => setDialog(true)}
                >
                <AddIcon />
              </IconButton>
              </Box>
          </Grid>
          {appStore.wines.map(({id, batch, productionDate, shelfLife, categoryId, taskId}) => (
            <Grid key={id} item xs={12} sm={3}>
            <Paper className={styles.paper}>
              <Grid container alignItems="stretch" direction="column">
                <Box m={2}>
                  <Typography variant="h6">{id} - {batch}</Typography>
                </Box>
                <Divider orientation="horizontal" />
                <Box m={2}>
                  <Typography variant="body1">
                    <b>Wine ID:</b> {id}
                  </Typography>
                  <Typography variant="body1">
                    <b>Batch:</b> {batch}
                  </Typography>
                  <Typography variant="body1">
                    <b>Production:</b> {productionDate.replace("T"," ")}
                  </Typography>
                  <Typography variant="body1">
                    <b>Shelf Life:</b> {shelfLife}
                  </Typography>
                </Box>
                <Divider orientation="horizontal" />
                <Box m={1}>
                  <Grid container justify="space-between">
                    <Button
                      color="primary"
                      size="large"
                      className={styles.buttonNew}
                      onClick={() => viewDetails(id)}
                      endIcon={<AddCircleOutlineOutlinedIcon />}
                    >
                      View Details
                    </Button>
                    <IconButton onClick={() => onDelete(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Box>

              </Grid>
            </Paper>
          </Grid>
          ))}
        </Grid>
      </Grid>

      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={styles.dialogT}>
          Wine Info
        </DialogTitle>
        <DialogContent>
          <Grid container direction="row">
            <Grid item xs={12} sm={12}>
              <Box p={2}>
                <Paper style={{background: '#DCDCDC'}}>
                  <Grid container alignItems="stretch" direction="column">
                    <Box m={1}>
                      <Typography variant="h5">Basic</Typography>
                    </Box>
                    <Divider orientation="horizontal" />
                    <Box m={1}>
                      <Typography variant="body1">
                        <b>Wine ID:</b> {wineDetail ? wineDetail.id : ""}
                      </Typography>
                      <Typography variant="body1">
                        <b>Batch:</b> {wineDetail ? wineDetail.batch : ""}
                      </Typography>
                      <Typography variant="body1">
                        <b>Production:</b> {wineDetail ? wineDetail.productionDate.replace("T"," ") : ""}
                      </Typography>
                      <Typography variant="body1">
                        <b>Shelf Life:</b> {wineDetail ? wineDetail.shelfLife : ""}
                      </Typography>
                    </Box>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Box p={2}>
                <Paper className={styles.paper2} style={{background: '#DCDCDC'}}>
                  <Grid container alignItems="stretch" direction="column">
                    <Box m={1}>
                      <Typography variant="h5">Category</Typography>
                    </Box>
                    <Divider orientation="horizontal" />
                    <Box m={1}>
                      <Typography variant="body1">
                        <b>ID:</b>  {wineDetail ? wineDetail.category.id : ""}
                      </Typography>
                      <Typography variant="body1">
                        <b>Description:</b> {wineDetail ? wineDetail.category.desc : ""}
                      </Typography>
                      <Typography variant="body1">
                        <b>Characteristics:</b> {wineDetail ? wineDetail.category.characteristics : ""}
                      </Typography>
                    </Box>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Box p={2}>
                <Paper style={{background: '#DCDCDC'}}>
                  <Grid container alignItems="stretch" direction="column">
                    <Box m={1}>
                      <Typography variant="h5">Task</Typography>
                    </Box>
                    <Divider orientation="horizontal" />
                    <Box m={1}>
                      <Typography variant="body1">
                        <b>ID:</b>   {wineDetail ? wineDetail.task.id : ""}
                      </Typography>
                      <Typography variant="body1">
                        <b>Started:</b> {wineDetail ? wineDetail.task.startedAt : ""}
                      </Typography>
                      <Typography variant="body1">
                        <b>Ended:</b> {wineDetail ? wineDetail.task.endedAt : ""}
                      </Typography>
                      <Typography variant="body1">
                        <b>Status:</b> {wineDetail ? wineDetail.task.status : ""}
                      </Typography>
                    </Box>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
            {wineDetail ? 
            wineDetail.stockWine.map(({stock, quantity, employee, entryDate}) => {
              return (
                <Grid key={"stock"+stock.id} item xs={6} sm={6}>
                <Box p={2}>
                  <Paper style={{background: '#DCDCDC'}}>
                    <Grid container alignItems="stretch" direction="column">
                      <Box m={1}>
                      <Typography variant="h5">Stock: {stock.title}</Typography>
                      </Box>
                      <Divider orientation="horizontal" />
                      <Box m={1}>
                        <Typography variant="body1">
                          <b>ID:</b> {wineDetail ? stock.id : ""}
                        </Typography>
                        <Typography variant="body1">
                          <b>Quantity:</b> {wineDetail ? quantity : ""}
                        </Typography>
                        <Typography variant="body1">
                          <b>WareHouse:</b> {wineDetail ? stock.title : ""}
                        </Typography>
                        <Typography variant="body1">
                          <b>Entry Date:</b> {wineDetail ? entryDate : ""}
                        </Typography>
                        <Typography variant="body1">
                          <b>Employer:</b> {wineDetail ? employee.firstName + " " + employee.lastName : ""}
                        </Typography>
                      </Box>
                    </Grid>
                  </Paper>
                </Box>
              </Grid>
            )
            })
            : null}
          </Grid>
        </DialogContent>
      </Dialog>
    
      <CustomDialog
        initialCategories={appStore.categories}
        initialTasks={appStore.tasks}
        initialWine={appStore.selectedWine}
        dialog={dialog}
        setDialog={setDialog}
        onSubmit={onSubmit}
      />
    
    </div>
  );
}

export default observer(Wines);