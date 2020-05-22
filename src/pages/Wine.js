import React, { useState } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Paper, Typography, Divider, Box, Button } from "@material-ui/core";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

const styles = makeStyles((theme) => ({
    styles: {
        color: '#ff0000',
        width: '100%'
    },
    root: {
        flexGrow: 1,
      },
    }));

export default function Stage() {
    const time = new Date().toLocaleString();
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [wineDetail, setWineDetail] = useState(null);

    function viewDetails(Wine) {
        setWineDetail(Wine);
        setDetailDialogOpen(true);
    }

  return (
    <div className={styles.root}>
    <Grid container justify="center" spacing={3}>
    <Grid container item xs={11} spacing={3} >
        <Grid item xs={12}>
            <Paper className={styles.paper}>
                <Box m={2} p={2}>
                    Header Buttons
                </Box>
            </Paper>
        </Grid>
        {[1,2,3,4,5,6,7].map( (item, index) => (
            <Grid key={item} item xs={12} sm={3}>
                <Paper className={styles.paper}>
                    <Grid container alignItems="stretch" direction="column">
                            <Box m={2}>
                                <Typography variant="h6">Wine Name</Typography>
                            </Box>
                            <Divider orientation="horizontal" />
                            <Box m={2}>
                                <Typography variant="body1"><b>Wine ID:</b> {item}</Typography>
                                <Typography variant="body1"><b>Batch:</b> A1SF</Typography>
                                <Typography variant="body1"><b>Production:</b> {time}</Typography>
                                <Typography variant="body1"><b>Shelf Life:</b> {time}</Typography>
                            </Box>
                            <Divider orientation="horizontal" />
                            <Box m={1}>
                            <Button
                                color="primary"
                                size="large"
                                className={styles.buttonNew}
                                onClick={() => viewDetails(item)}
                                endIcon={<AddCircleOutlineOutlinedIcon/>}>
                                View Details
                            </Button>
                            </Box>

                    </Grid>
                </Paper>
            </Grid>
        ))}
    </Grid>
    </Grid>

    <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={styles.dialogT}>Wine Info</DialogTitle>
      <DialogContent>
        <Grid container direction="row" justify="space-evenly">
        <Grid item xs={6} sm={6}>
            <Box p={2}>
            <Paper className={styles.paper}>
                <Grid container alignItems="stretch" direction="column">
                    <Box m={1}>
                        <Typography variant="h5">Basic</Typography>
                    </Box>
                    <Divider orientation="horizontal" />
                    <Box m={1}>
                        <Typography variant="body1"><b>Name:</b> WD</Typography>
                        <Typography variant="body1"><b>Wine ID:</b> {wineDetail}</Typography>
                        <Typography variant="body1"><b>Batch:</b> SW12F</Typography>
                        <Typography variant="body1"><b>Production:</b> {time}</Typography>
                        <Typography variant="body1"><b>Shelf Life:</b> {time}</Typography>
                    </Box>
                </Grid>
            </Paper>
            </Box>
        </Grid>
        <Grid item xs={6} sm={6}>
            <Box p={2}>
            <Paper className={styles.paper}>
                <Grid container alignItems="stretch" direction="column">
                    <Box m={1}>
                        <Typography variant="h5">Stock</Typography>
                    </Box>
                    <Divider orientation="horizontal" />
                    <Box m={1}>
                        <Typography variant="body1"><b>Quantity:</b> 950</Typography>
                        <Typography variant="body1"><b>WareHouse:</b> C3-Leste</Typography>
                        <Typography variant="body1"><b>Entry Date:</b> {time}</Typography>
                        <Typography variant="body1"><b>Employer:</b> Milton Junior</Typography>
                    </Box>
                </Grid>
            </Paper>
            </Box>
        </Grid>
        <Grid item xs={6} sm={6}>
            <Box p={2}>
            <Paper className={styles.paper}>
                <Grid container alignItems="stretch" direction="column">
                    <Box m={1}>
                        <Typography variant="h5">Category</Typography>
                    </Box>
                    <Divider orientation="horizontal" />
                    <Box m={1}>
                        <Typography variant="body1"><b>ID:</b> {wineDetail}</Typography>
                        <Typography variant="body1"><b>Description:</b> Red Wines</Typography>
                        <Typography variant="body1"><b>Characteristics:</b> SW154</Typography>
                    </Box>
                </Grid>
            </Paper>
            </Box>
        </Grid>
        <Grid item xs={6} sm={6}>
            <Box p={2}>
            <Paper className={styles.paper}>
                <Grid container alignItems="stretch" direction="column">
                    <Box m={1}>
                        <Typography variant="h5">Task</Typography>
                    </Box>
                    <Divider orientation="horizontal" />
                    <Box m={1}>
                        <Typography variant="body1"><b>ID:</b> {wineDetail}</Typography>
                        <Typography variant="body1"><b>Started:</b> {time}</Typography>
                        <Typography variant="body1"><b>Ended:</b> {time}</Typography>
                    </Box>
                </Grid>
            </Paper>
            </Box>
        </Grid>
        </Grid>

      </DialogContent>
    </Dialog>
    </div>
  );
}
