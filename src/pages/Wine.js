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
import { Data } from "react-data-grid-addons";

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

    // Fetch Categories
    useEffect(() => {
      appStore.fetchWines();
    }, [appStore]);
  
    // Clear Category Selection
    useEffect(() => {
      if (!dialog) {
        appStore.clearSelectedWine();
      }
    }, [dialog, appStore]);
  
    const onSubmit = (type, category) => {
      if (type === "CREATE") {
        appStore.createCategory(category);
      } else {
        appStore.editCategory(category);
      }
      appStore.clearSelectedCategory();
    };
  
    const onEdit = (id) => {
      appStore.setSelectedCategory(id);
      setDialog(true);
    };
  
    const onDelete = (id) => {
      appStore.deleteCategory(id);
    };
  
  const time = new Date().toLocaleString();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [wineDetail, setWineDetail] = useState(null);

  function viewDetails(Wine) {
    let {id,categoryId,taskId} = Wine

    const body = {
      query: `{
        wine (id:${id}) { 
          id 
          batch
          productionDate
          shelfLife
          stockWine {
            stock {
              id
              quantity
              warehouse
              entryDate
              employee {
                firstName
                lastName
              }
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
        /*runInAction(() => {
          appStore.categories = categories.map(
            ({ id, desc, characteristics }) =>
              new Category(id, desc, "RAW", characteristics, [])
          );
        });*/
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.root}>
      <Grid container justify="center" spacing={3}>
        <Grid container item xs={11} spacing={3}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <Box m={2} p={2}>
                Header Buttons
              </Box>
            </Paper>
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
                    <b>Production:</b> {productionDate}
                  </Typography>
                  <Typography variant="body1">
                    <b>Shelf Life:</b> {shelfLife}
                  </Typography>
                </Box>
                <Divider orientation="horizontal" />
                <Box m={1}>
                  <Button
                    color="primary"
                    size="large"
                    className={styles.buttonNew}
                    onClick={() => viewDetails({id,categoryId,taskId})}
                    endIcon={<AddCircleOutlineOutlinedIcon />}
                  >
                    View Details
                  </Button>
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
                        <b>Production:</b> {wineDetail ? wineDetail.productionDate : ""}
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
            wineDetail.stockWine.map(({stock}) => {
              return (
                <Grid key={"stock"+stock.id} item xs={6} sm={6}>
                <Box p={2}>
                  <Paper style={{background: '#DCDCDC'}}>
                    <Grid container alignItems="stretch" direction="column">
                      <Box m={1}>
                      <Typography variant="h5">Stock: {stock.id}</Typography>
                      </Box>
                      <Divider orientation="horizontal" />
                      <Box m={1}>
                        <Typography variant="body1">
                          <b>ID:</b> {wineDetail ? stock.id : ""}
                        </Typography>
                        <Typography variant="body1">
                          <b>Quantity:</b> {wineDetail ? stock.quantity : ""}
                        </Typography>
                        <Typography variant="body1">
                          <b>WareHouse:</b> {wineDetail ? stock.warehouse : ""}
                        </Typography>
                        <Typography variant="body1">
                          <b>Entry Date:</b> {wineDetail ? stock.entryDate : ""}
                        </Typography>
                        <Typography variant="body1">
                          <b>Employer:</b> {wineDetail ? stock.employee.firstName + " " + stock.employee.lastName : ""}
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
    </div>
  );
}

export default observer(Wines);