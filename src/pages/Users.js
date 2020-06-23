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
  const [dialogContent, setdialogContent] = useState({
    id: null, 
    name: null,
    firstName: null,
    lastName: null, 
    nif: null, 
    role: null ,
    username: null, 
    phone: null, 
    email: null, 
    birthday: null, 
    address: null, 
    password: null,
    passwordConfirm: null,
  });


  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeDialogContent, setRemoveDialogContent] = useState( {
    id: null, 
    name: null,
    firstName: null,
    lastName: null, 
    nif: null, 
    role: null ,
    username: null, 
    phone: null, 
    email: null, 
    birthday: null, 
    address: null, 
    hashedPassword: null,
    createdAt: null,
    roleId: null
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
    setRemoveDialogContent(data);
    setRemoveDialogOpen(true);
  }

  function handleRemoveDialog() {

    api.post('/', {
      "query": "mutation($employee: InputEmployeeType) {deleteEmployee(employee:$employee){ id username }}",
      "variables": `{"employee":{
      "id":${removeDialogContent.id},
      "username":"${removeDialogContent.username}",
      "firstName":"${removeDialogContent.firstName}",
      "lastName":"${removeDialogContent.lastName}",
      "nif":"${removeDialogContent.nif}",
      "birthdate":"${removeDialogContent.birthday}",
      "adress":"${removeDialogContent.address}",
      "phone":"${removeDialogContent.phone}",
      "email":"${removeDialogContent.email}",
      "hashedPassword":"${removeDialogContent.hashedPassword}",
      "createdAt":"12/25/2015",
      "roleId":${removeDialogContent.roleId}
    }}`
    }).then(function (response3) {
      alert("User Removed!");
      setUpdateRequest(!updateRequest);
      setRemoveDialogOpen(false);
    }).catch(function (error3) {
      alert("Error when trying to remove the User!");
    });
  }

  const [onceRolesLoad,setOnceRolesLoad] = useState(true);

  /*function loadRoles() {
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
  }*/

  function handleDialogSendEditUser() {
    api.post('/', {
      "query": "mutation($employee: InputEmployeeType) {updateEmployee(employee:$employee){ id username }}",
      "variables": `{"employee":{
      "id":${dialogContent.id},
      "username":"${dialogContent.username}",
      "firstName":"${dialogContent.firstName}",
      "lastName":"${dialogContent.lastName}",
      "nif":"${dialogContent.nif}",
      "birthdate":"${dialogContent.birthday}",
      "adress":"${dialogContent.address}",
      "phone":"${dialogContent.phone}",
      "email":"${dialogContent.email}",
      "hashedPassword":"${dialogContent.password}",
      "createdAt":"12/25/2015",
      "roleId":${dialogContent.roleId}
    }}`
    }).then(function (response3) {
      alert("User Modify Success!");
      handleDialogClose();
      setUpdateRequest(!updateRequest);
    }).catch(function (error3) {
      alert("Error when trying to modify the User!");
    });
  }

  function handleDialogSendNewUser() {
    console.log("NEW")
    console.log(dialogContent);

    if (dialogContent.firstName === null || dialogContent.lastName === "") {
      return alert("First/Last Name Missing!");
    }

    if (dialogContent.password !== dialogContent.passwordConfirm) {
      return alert("The passwords does not match!");
    }

    api.post('/', {
      "query": "mutation($employee: InputEmployeeType) {addEmployee(employee:$employee){ id username }}",
      "variables": `{"employee":{
      "id":0,
      "username":"${dialogContent.username}",
      "firstName":"${dialogContent.firstName}",
      "lastName":"${dialogContent.lastName}",
      "nif":"${dialogContent.nif}",
      "birthdate":"${dialogContent.birthday}",
      "adress":"${dialogContent.address}",
      "phone":"${dialogContent.phone}",
      "email":"${dialogContent.email}",
      "hashedPassword":"${dialogContent.password}",
      "createdAt":"12/25/2015",
      "roleId":${dialogContent.roleId}
    }}`
    }).then(function (response2) {
      console.log("Criado-User: ",response2);
      alert("User Registred!");
      handleDialogClose();
      setUpdateRequest(!updateRequest);
    }).catch(function (error2) {
      console.log("Error: ");
      console.log(error2);
      alert("Error when trying to register! Verify your inputs!");
    });
      /* else {

        api.post('/', {
          "query": "mutation($role: InputRoleType) {addRole(role:$role){ id desc permissionId }}",
          "variables": `{"role":{"id":0,"desc":"${dialogContent.name}","permissionId":${calcPermission()}}}`
        }).then(function (response4) {
          console.log("Criado-Role (com permissao ja existente): ",response4);
          setUpdateRequest(!updateRequest);
        }).catch(function (error4) {
          console.log("Erro3: ",error4);
        });

      }

    }).catch(function (error) {
      console.log("Erro: ",error);
      alert("Erro ao cadastrar!\nTente novamente");
    });*/
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
      roles { id desc permissionId }
    }`
    }).then(function (response) {
      // Get Roles
      let newRowRoles = [];
      response.data.roles.map((role) => {
        newRowRoles.push({id: role.id, name: role.desc});
      });
      setRoleList(newRowRoles);

      //{id: 0, name: 'Ros Main', role: 'Assistant', username: 'paiaco', phone: '351912030399', email: 'ros@gmail.com', birthday: '20/04/1991', address: 'Rua Ernani Batista, 925', actions: ''},
      let newRowUsers = [];
      response.data.employees.map((row) => {
        //let rowName = roleList.reduce(roleItem => role.roleId === roleItem.id);
        newRowUsers.push({id: row.id, name: row.firstName + " " + row.lastName, firstName: row.firstName, lastName: row.lastName, nif: row.nif, role: newRowRoles.filter(rl => rl.id === row.roleId)[0].name, roleId: row.roleId, username: row.username, phone: row.phone, email: row.email, birthday: row.birthdate, address: row.adress, password: row.hashedPassword , actions: ''});
      });
      setRows(newRowUsers);
      
    }).catch(function (error) {
      console.log("Erro: ",error);
    });
  }

  useEffect(() => {
    //if (onceRolesLoad) {
      //setOnceRolesLoad(false);
      //loadRoles();
      //updateTable();
    //} else {
      updateTable();
    //}
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
          onChange={(e) => setdialogContent({ ...dialogContent, firstName: e.target.value })}
        />
        <TextField
          margin="dense"
          id="lastname"
          label="Last Name"
          defaultValue={isEdit ? dialogContent.lastName : ''}
          onChange={(e) => setdialogContent({ ...dialogContent, lastName: e.target.value })}

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
                onChange={(e) => setdialogContent({ ...dialogContent, nif: e.target.value })}
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
                onChange={(e) => setdialogContent({ ...dialogContent, birthday: e.target.value })}
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
          onChange={(e) => setdialogContent({ ...dialogContent, address: e.target.value })}
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
              onChange={(e) => setdialogContent({ ...dialogContent, email: e.target.value })}
              fullWidth
            /></Box>
          <Box marginLeft={1}>
            <ReactPhoneInput
              value={dialogContent.phone}
              defaultCountry={'pt'}
              inputClass={classes.field}
              regions={'europe'}
              component={TextField}
              onChange={(e) => setdialogContent({ ...dialogContent, phone: e })}
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
                onChange={(e) => setdialogContent({ ...dialogContent, roleId: e.target.value })}
                defaultValue={isEdit ? dialogContent.roleId : ""}
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
              onChange={(e) => setdialogContent({ ...dialogContent, passwordConfirm: e.target.value })}
              defaultValue={isEdit ? dialogContent.password : ''}
            />
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} size="large" color="primary">
          Cancel
        </Button>
        <Button onClick={isEdit ? handleDialogSendEditUser : handleDialogSendNewUser} size="large" className={isEdit ? classes.modalButtonEdit : classes.modalButtonRegister}>
          {isEdit ? 'Save Edit' : 'Register'}
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
