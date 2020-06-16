import React, { useEffect, useState } from "react";
import { Grid, Button, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ReactPhoneInput from 'react-phone-input-mui';
import CustomGrid from '../components/Layouts/User/CustomGrid';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Select } from '@material-ui/core';
import api from '../services/api';

const useStyles = makeStyles((theme) => ({
  defaultMargin: {
    margin: '1rem 2rem'
  },
  buttonNew: {
      color: '#ffffff',
      backgroundColor: '#7E025E',
      '&:hover': {
          backgroundColor: '#63004a'
       }
    },
  modalButtonRegister: {
    color: '#ffffff',
    backgroundColor: '#2196F3',
    '&:hover': {
        backgroundColor: '#63004a'
     }
  },
  modalButtonEdit: {
    color: '#ffffff',
    backgroundColor: '#E10050',
      '&:hover': {
          backgroundColor: '#63004a'
       }
  },
  modalButtonRemove: {
    color: '#ffffff',
    backgroundColor: '#941313',
      '&:hover': {
          backgroundColor: '#941313'
      }
  },
}));

function convertDate(dateStr) {
  let dateparts = dateStr.split("/");
  return new Date(dateparts[2]+'-'+dateparts[1]+'-'+dateparts[0]).toISOString().split('T')[0]
}

export default function Users() {
  const classes = useStyles();

  const defaultColumnProperties = {
    filterable: true,
  };

  const columns = [
    { key: 'name', name: 'Name' },
    { key: 'role', name: 'Role' },
    { key: 'username', name: 'Username' },
    { key: 'phone', name: 'Phone' },
    { key: 'email', name: 'Email' },
    { key: 'birthday', name: 'Birthday' },
    { key: 'address', name: 'Address' },
    { key: 'actions', name: 'Actions', width: 80 },
  ].map(c => ({ ...c, ...defaultColumnProperties }));
  
  const [updateRequest, setUpdateRequest] = useState(true);

  const [rows,setRows] = useState([
    /*
    {id: 0, name: 'Ros Main', role: 'Assistant', username: 'paiaco', phone: '351912030399', email: 'ros@gmail.com', birthday: '20/04/1991', address: 'Rua Ernani Batista, 925', actions: ''},
    {id: 1, name: 'Calvin Malk', role: 'Engineer', username: 'paiaco', phone: '2141212412', email: 'ros@gmail.com', birthday: '20/04/1991', address: 'Rua Ernani Batista, 925', actions: ''},
    {id: 2, name: 'Wester Park', role: 'Developer', username: 'paiaco', phone: '64564644589', email: 'ros@gmail.com', birthday: '20/04/1991', address: 'Rua Ernani Batista, 925', actions: ''},
    {id: 3, name: 'Filer Ispor', role: 'Cloud Expert', username: 'paiaco', phone: '2654869345', email: 'ros@gmail.com', birthday: '20/04/1991', address: 'Rua Ernani Batista, 925', actions: ''},
    {id: 4, name: 'Catrine Bors', role: 'Lead Design', username: 'paiaco', phone: '0988776970', email: 'ros@gmail.com', birthday: '12/04/1991', address: 'Rua Ernani Batista, 925', actions: ''},
    */
  ]);

  const [roleList,setRoleList] = useState([
    /*{id: 0, name: 'Assistant'},
    {id: 1, name: 'Engineer'},
    {id: 2, name: 'Developer'},
    {id: 3, name: 'Cloud Expert'},
    {id: 4, name: 'Lead Design'}*/
  ]);

  const [isEdit,setIsEdit] = useState(false);

  const [dialogOpen, setdialogOpen] = useState(false);
  const [dialogContent, setdialogContent] = useState( (i => { i = rows[0]; return i = {}}) );


  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeDialogContent, setRemoveDialogContent] = useState( {
    id: null,
    name: '',
  });

  const handleDialogOpen = () => {
    setdialogOpen(true);
  };

  const handleDialogClose = () => {
    setdialogOpen(false);
  };

  function handleEditUser(data) {
    setIsEdit(true);
    setdialogContent(data);
    return handleDialogOpen();
  }

  function handleNewUser() {
    setIsEdit(false);
    setdialogContent( i => { i = rows[0]; return i = {}} );
    return handleDialogOpen();
  }

  function handleRemoveUser(data) {
    setRemoveDialogContent({ id: data.id, name: data.name });
    setRemoveDialogOpen(true);
  }

  function handleRemoveDialog() {
    setRemoveDialogOpen(false);
    const data = {
      id: removeDialogContent.id
    };
    console.log("Envia um chamada DELETE com:",data);
  }

  const [onceRolesLoad,setOnceRolesLoad] = useState(true);

  function loadRoles() {
    api.post('/', {
      "query": `{roles { id desc }}`
    }).then(function (response) {

      let newRow = [];
      response.data.roles.map((role) => {
        newRow.push({id: role.id, name: role.desc});
      });

      setRoleList(newRow);
      
    }).catch(function (error) {
      console.log("Erro: ",error);
    });
  }

  function handleDialogSendEditUser() {
    console.log("EDIT")
    console.log(dialogContent);
  }

  function handleDialogSendNewUser() {
    console.log("NEW")
    console.log(dialogContent);
  }

  function updateTable() {
    api.post('/', {
      "query": `{  employees {
        id
        username
        firstName
        lastName
        nif
        birthdate
        adress
        phone
        email
        hashedPassword      
        roleId
      }
    }`
    }).then(function (response) {
      //{id: 0, name: 'Ros Main', role: 'Assistant', username: 'paiaco', phone: '351912030399', email: 'ros@gmail.com', birthday: '20/04/1991', address: 'Rua Ernani Batista, 925', actions: ''},
      let newRow = [];
      
      response.data.employees.map((row) => {
        //let rowName = roleList.reduce(roleItem => role.roleId === roleItem.id);
        newRow.push({id: row.id, name: row.firstName + " " + row.lastName, firstName: row.firstName, lastName: row.lastName, nif: row.nif, role: row.roleId, username: row.username, phone: row.phone, email: row.email, birthday: row.birthdate, address: row.adress, password: row.hashedPassword , actions: ''});
      });

      setRows(newRow);
      
    }).catch(function (error) {
      console.log("Erro: ",error);
    });
  }

  useEffect(() => {
    if (onceRolesLoad) {
      setOnceRolesLoad(false);
      loadRoles();
      updateTable();
    } else {
      updateTable();
    }
  }, [updateRequest]);

  return (
  <>
    <Grid container>
      <Grid item xs={11}  className={classes.defaultMargin}>
        <CustomGrid title={'User Management'} columns={columns} rows={rows} handleRemove={handleRemoveUser} handleEdit={handleEditUser}></CustomGrid>
      </Grid>
      <Grid item xs={11}  className={classes.defaultMargin}>
        <Grid container justify="flex-start" alignItems="flex-end">
          <Grid item>
            <Box mt={2}><Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonNew}
              onClick={() => handleNewUser()}
              endIcon={<AddOutlinedIcon />}
              style={classes}
            >Register New</Button></Box>
          </Grid>
        </Grid >
      </Grid >
    </Grid>



    <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{isEdit ? 'Edit User' : 'Register New User'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isEdit ? 'Formulary to modify data of an existing user.' : 'Formulary to register new user.'}
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="First Name"
          defaultValue={isEdit ? dialogContent.firstName : ''}
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastname"
          label="Last Name"
          defaultValue={isEdit ? dialogContent.lastName : ''}

        />
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={6}>
            <Box marginRight={1}>
              <TextField
                margin="dense"
                id="nif"
                label="NIF"
                fullWidth
                type="number"
                defaultValue={isEdit ? dialogContent.nif : ''}
              /></Box>
          </Grid>
          <Grid item xs={6}>
            <Box marginLeft={1}>
              <TextField
                margin="dense"
                id="birthday"
                label="Birthday Date"
                type="date"
                fullWidth
                defaultValue={isEdit ? convertDate(dialogContent.birthday) : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <TextField
          margin="dense"
          id="address"
          label="Full Address"
          defaultValue={isEdit ? dialogContent.address : ''}
          fullWidth
        />
        <Grid container direction="row" justify="space-evenly" alignItems="flex-end">
          <Box marginRight={1}>
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              defaultValue={isEdit ? dialogContent.email : ''}
              fullWidth
            /></Box>
          <Box marginLeft={1}>
            <ReactPhoneInput
              value={dialogContent.phone}
              defaultCountry={'pt'}
              inputClass={classes.field}
              regions={'europe'}
              component={TextField}
              dropdownClass={classes.countryList}
              inputExtraProps={{
                margin: 'normal',
                label: 'Phone Number',
                autoComplete: 'phone',
                name: 'custom-username'
              }}
            />
          </Box>
        </Grid>
        <Grid container direction="row" justify="space-evenly" alignItems="flex-end">
          <Grid item xs={6}>
            <Box marginRight={1}>
              <TextField
                margin="dense"
                id="username"
                label="UserName"
                fullWidth
                onChange={(e) => setdialogContent({ ...dialogContent, username: e.target.value })}
                defaultValue={isEdit ? dialogContent.username : ''}
              /></Box>
          </Grid>
          <Grid item xs={6}>
            <Box ml={1} xs={6} >
              <InputLabel htmlFor="standard-key-native-simple">Role</InputLabel>
              <Select
                fullWidth
                native
                variant='standard'
                onChange={(e) => setdialogContent({ ...dialogContent, role: e.target.value })}
                defaultValue={dialogContent.role}
                inputProps={{
                  name: 'key',
                  id: 'standard-key-native-simple',
                }}
              >
                {roleList.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>)
                )}
              </Select>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-evenly">
          <Box mr={1}>
            <TextField
              margin="dense"
              id="pass"
              label="Password"
              type="password"
              onChange={(e) => setdialogContent({ ...dialogContent, password: e.target.value })}
              defaultValue={isEdit ? dialogContent.password : ''}
            /></Box>
          <Box ml={1}>
            <TextField
              margin="dense"
              id="passconf"
              label="Password Confirmation"
              type="password"
              onChange={(e) => setdialogContent({ ...dialogContent, password: e.target.value })}
              defaultValue={isEdit ? dialogContent.password : ''}
            />
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} size="large" color="primary">
          Cancel
        </Button>
        <Button onClick={isEdit ? handleDialogSendEditUser : handleDialogSendNewUser} size="large" className={dialogContent && dialogContent.name ? classes.modalButtonEdit : classes.modalButtonRegister}>
          {dialogContent && dialogContent.name ? 'Save Edit' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>



    <Dialog
        open={removeDialogOpen}
        onClose={() => setRemoveDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Remove</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to remove the User: <b>{removeDialogContent.name}</b> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleRemoveDialog()} className={classes.modalButtonRemove} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>

  </>
  );
}
