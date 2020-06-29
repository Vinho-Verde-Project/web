import React, { useEffect, useState } from "react";
import { Grid, Button, Box, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CustomGrid from '../components/Layouts/User/CustomGrid';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Checkbox, FormGroup, FormControl  } from '@material-ui/core';
import api from '../services/api';

const permissionsMap = {
    128: 'Permissões',
    64: 'Usuarios',
    32: 'Tarefas',
    16: 'Etapas',
    8: 'Vinhos',
    4: 'Produtos',
    2: 'Estoque',
    1: 'Dashboard',
}

function calcPermissionLevel(row, entrada, saida=[], start=128) {
    if (entrada <= 0) {
        return row;
    } else {
        if(entrada >= start) {
            row[permissionsMap[start]] = <div align="center"><DoneOutlinedIcon/></div>;
            return calcPermissionLevel(row,entrada-start,saida,(start/2));
        } else {
            row[permissionsMap[start]] = '';
            return calcPermissionLevel(row,entrada,saida,(start/2));
        }
    }
}

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

export default function Permissions() {
  const classes = useStyles();

  const [permissionBox, setPermissionBox] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
    checkedF: false,
    checkedG: false,
    checkedH: false,
  });

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeDialogContent, setRemoveDialogContent] = useState( {
    id: null,
    name: '',
  } );

  const [dialogOpen, setdialogOpen] = useState(false);
  const [dialogContent, setdialogContent] = useState( {
    id: null,
    name: '',
    acessLevel: 0
  } );

  const handleChange = (event) => {
    setPermissionBox({ ...permissionBox, [event.target.name]: event.target.checked });
  };

  const columns = [
    { key: 'name', name:<div align="center">Name</div>, width:350  },
    { key: 'Dashboard', name:<div align="center">Dashboard</div>  },
    { key: 'Estoque', name:<div align="center">Estoque</div>},
    { key: 'Produtos', name:<div align="center">Produtos</div>},
    { key: 'Vinhos', name:<div align="center">Vinhos</div>},
    { key: 'Etapas', name:<div align="center">Etapas</div>},
    { key: 'Tarefas', name:<div align="center">Tarefas</div>},
    { key: 'Usuarios', name:<div align="center">Usuarios</div>},
    { key: 'Permissões', name:<div align="center">Permissões</div>},
    { key: 'actions', name: <div align="center">Actions</div>, width: 80 }
  ].map(c => ({ ...c, filterable: true }));

  const [updateRequest, setUpdateRequest] = useState(true);
  
  const [rows,setRows] = useState([
    /*{id: 4, name: 'CEO', acessLevel: 255},
    {id: 1, name: 'Engineer', acessLevel: 154},
    {id: 2, name: 'Developer', acessLevel: 55},
    {id: 3, name: 'Cloud Expert', acessLevel: 88},
    {id: 0, name: 'Assistant', acessLevel: 8,},*/
  ]);

  rows.map(row => { return row = calcPermissionLevel(row, row.acessLevel);  });

  const handleDialogOpen = () => {
    setdialogOpen(true);
  };

  function handleDialogContent(event) {
    setdialogContent({...dialogContent, [event.target.name]: event.target.value});
  }

  function calcPermission() {
    let total = 0;
    if (permissionBox.checkedA === true) { total += 1};
    if (permissionBox.checkedB === true) { total += 2};
    if (permissionBox.checkedC === true) { total += 4};
    if (permissionBox.checkedD === true) { total += 8};
    if (permissionBox.checkedE === true) { total += 16};
    if (permissionBox.checkedF === true) { total += 32};
    if (permissionBox.checkedG === true) { total += 64};
    if (permissionBox.checkedH === true) { total += 128};
    return total;
  }

  function editPermission(acessLevel) {
    let total = acessLevel;
    if (total >= 128) { permissionBox.checkedH = true; total -= 128;} else {permissionBox.checkedH =  false};
    if (total >= 64)  { permissionBox.checkedG = true;; total -= 64;}  else {permissionBox.checkedG =  false};
    if (total >= 32)  { permissionBox.checkedF = true; total -= 32;}  else {permissionBox.checkedF =   false};
    if (total >= 16)  { permissionBox.checkedE = true; total -= 16;}  else {permissionBox.checkedE =   false};
    if (total >= 8)   { permissionBox.checkedD = true; total -= 8;}   else {permissionBox.checkedD =   false};
    if (total >= 4)   { permissionBox.checkedC = true; total -= 4;}   else {permissionBox.checkedC =  false};
    if (total >= 2)   { permissionBox.checkedB = true; total -= 2;}   else {permissionBox.checkedB =   false};    
    if (total >= 1)   { permissionBox.checkedA = true; total -= 1;}   else {permissionBox.checkedA =   false    };
    return total;
  }

  // DIALOG Functions
  // Open: [ 1. Open with New Button | 2. Open with Edit Button ]
  // Close: [ 1. On Close Dialog ]
  // Send: [ 1. Send with Register Button (new) | 2. Send with Edit Button ]

  const handleDialogClose = () => {
    setdialogOpen(false);
  };

  function handleDialogOpenEditRole(data) {
    editPermission(data.acessLevel)
    setdialogContent(data);
    handleDialogOpen();
  }

  function handleDialogOpenNewRole() {
    editPermission(0);
    setdialogContent({ id: null, name: '', acessLevel: 0  });
    handleDialogOpen();
  }

  function handleRemoveRole(role) {
    setRemoveDialogContent({ id: role.id, name: role.name });
    setRemoveDialogOpen(true);
  }

  function handleDialogSendEditRole() {
    /*const data = {
      id: dialogContent.id,
      name: dialogContent.name,
      acessLevel: calcPermission()
    }*/

    if (calcPermission() === 0) {
      return alert("Erro: Nenhuma permissao foi selecionada.");
    }

    api.post('/', {
      "query": `{permission(id: ${calcPermission()}) { id }}`,
    }).then(function (response) {

      if (response.data.permission == null) {
        api.post('/', {
          "query": "mutation($permission: InputPermissionType) {addPermission(permission:$permission){ id }}",
	        "variables": `{"permission":{"id":${calcPermission()},"desc":"-"}}`
        }).then(function (response2) {
          console.log("Criado-Permissao: ",response2);

          api.post('/', {
            "query": "mutation($role: InputRoleType) {updateRole(role:$role){ id desc permissionId }}",
            "variables": `{"role":{"id":${dialogContent.id},"desc":"${dialogContent.name}","permissionId":${calcPermission()}}}`
          }).then(function (response3) {
            console.log("Editado-Role: ",response3);
            setUpdateRequest(!updateRequest);
          }).catch(function (error3) {
            console.log("Erro3: ",error3);
          });

        }).catch(function (error2) {
          console.log("Erro2: ",error2);
        });
      } else {

        api.post('/', {
          "query": "mutation($role: InputRoleType) {updateRole(role:$role){ id desc permissionId }}",
          "variables": `{"role":{"id":${dialogContent.id},"desc":"${dialogContent.name}","permissionId":${calcPermission()}}}`
        }).then(function (response4) {
          console.log("Editado-Role (com permissao ja existente): ",response4);
          setUpdateRequest(!updateRequest);
        }).catch(function (error4) {
          console.log("Erro3: ",error4);
        });

      }

    }).catch(function (error) {
      console.log("Erro: ",error);
      alert("Erro ao cadastrar!\nTente novamente");
    });
    
    handleDialogClose();
    //console.log("Envia um chamada PUT com:",data);
  }

  function handleDialogSendNewRole() {

    if (calcPermission() === 0) {
      return alert("Erro: Nenhuma permissao foi selecionada.");
    }
    if (dialogContent.name == null || dialogContent.name === "") {
      return alert("Erro: Nenhum nome foi inserido!");
    }

    api.post('/', {
      "query": `{permission(id: ${calcPermission()}) { id }}`,
    }).then(function (response) {

      if (response.data.permission == null) {
        api.post('/', {
          "query": "mutation($permission: InputPermissionType) {addPermission(permission:$permission){ id }}",
	        "variables": `{"permission":{"id":${calcPermission()},"desc":"-"}}`
        }).then(function (response2) {
          console.log("Criado-Permissao: ",response2);

          api.post('/', {
            "query": "mutation($role: InputRoleType) {addRole(role:$role){ id desc permissionId }}",
            "variables": `{"role":{"id":0,"desc":"${dialogContent.name}","permissionId":${calcPermission()}}}`
          }).then(function (response3) {
            console.log("Criado-Role: ",response3);
            setUpdateRequest(!updateRequest);
          }).catch(function (error3) {
            console.log("Erro3: ",error3);
          });

        }).catch(function (error2) {
          console.log("Erro2: ",error2);
        });
      } else {

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
    });

    handleDialogClose();

    /*const data = {
      id: dialogContent.id,
      name: dialogContent.name,
      acessLevel: calcPermission()
    }
    
    console.log("Envia um chamada POST com:",data);
    */
  }

  function handleRemoveDialog() {
    setRemoveDialogOpen(false);

    let permissionId = 0;
    rows.map(item => {
      if (item.id === removeDialogContent.id) {
        permissionId = item.acessLevel;
      }
    });

    /*const data = {
      id: removeDialogContent.id,
      desc: removeDialogContent.name,
      permissionId: permissionId,
    };*/

    if(permissionId !== 0) {
      api.post('/', {
        "query": "mutation($role: InputRoleType) {deleteRole(role:$role){ id desc permissionId }}",
        "variables": `{"role":{"id":${removeDialogContent.id},"desc":"${removeDialogContent.name}","permissionId":${permissionId}}}`
      }).then(function (response3) {
        //console.log("Removido com Sucesso: ",response3);
        setUpdateRequest(!updateRequest);
      }).catch(function (error3) {
        //console.log("Erro3: ",error3);
        alert("Erro ao tentar remover!");
      });
    } else {
      alert("Erro ao tentar remover!");
    }
  }

  function updateTable() {
    api.post('/', {
      "query": `{roles { id desc permissionId }}`
    }).then(function (response) {

      let newRow = [];
      response.data.roles.map((role) => {
        newRow.push({id: role.id, name: role.desc, acessLevel: role.permissionId});
      });

      setRows(newRow);
      
    }).catch(function (error) {
      console.log("Erro: ",error);
    });
  }

  useEffect(() => {
      updateTable();
  }, [updateRequest]);

  return (
    <>
      <Grid container>
        <Grid item xs={11} className={classes.defaultMargin}>
          <CustomGrid defaultSearch={' '} title={'Roles & Permissions Management'} columns={columns} rows={rows} handleRemove={handleRemoveRole} handleEdit={handleDialogOpenEditRole}></CustomGrid>
        </Grid>
        <Grid item xs={11} className={classes.defaultMargin}>
          <Grid container justify="flex-start" alignItems="flex-end">
            <Grid item>
              <Box mt={2}><Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.buttonNew}
                onClick={() => handleDialogOpenNewRole()}
                endIcon={<AddOutlinedIcon />}
                style={classes}
              >Register New</Button></Box>
            </Grid>
          </Grid >
        </Grid >
      </Grid>


      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogContent && dialogContent.id !== null ? 'Edit Role/Permissions' : 'Register New Role'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent && dialogContent.id !== null ? 'Formulary to modify permissions of an existing role.' : 'Formulary to register new role.'}
          </DialogContentText>
          <form noValidate autoComplete="off">
            <FormControl>
              <TextField
                margin="dense"
                id="name"
                label="Role Name"
                InputProps={{
                  name: 'name',
                  value: dialogContent.name,
                  onChange: e => handleDialogContent(e),
                }}
                fullWidth
              />
            </FormControl>
            <Box mt={2}>
              <Typography variant={"h6"}>Permissions of Role:</Typography>
            </Box>
            <FormGroup>
              <Grid container direction="column" alignItems="stretch" spacing={2}>
                <Grid item >
                  <FormControlLabel control={<Checkbox onChange={handleChange} checked={permissionBox.checkedA} name="checkedA" color="primary" />} label="Dashboard" />
                  <Grid item >
                    <Box mt={2}>
                      <Typography variant={"body1"}>Gerenciamento:</Typography>
                      <FormControlLabel control={<Checkbox onChange={handleChange} checked={permissionBox.checkedB} name="checkedB" color="primary" />} label="Estoque" />
                      <FormControlLabel control={<Checkbox onChange={handleChange} checked={permissionBox.checkedC} name="checkedC" color="primary" />} label="Produtos" />
                      <FormControlLabel control={<Checkbox onChange={handleChange} checked={permissionBox.checkedD} name="checkedD" color="primary" />} label="Vinhos" />
                    </Box></Grid>
                  <Grid item>
                    <Box mt={2}>
                      <Typography variant={"body1"}>Producão:</Typography>
                      <FormControlLabel control={<Checkbox onChange={handleChange} checked={permissionBox.checkedE} name="checkedE" color="primary" />} label="Etapas" />
                      <FormControlLabel control={<Checkbox onChange={handleChange} checked={permissionBox.checkedF} name="checkedF" color="primary" />} label="Tarefas" />
                    </Box></Grid>
                  <Grid item >
                    <Box mt={2}>
                      <Typography variant={"body1"}>Administração:</Typography>
                      <FormControlLabel control={<Checkbox onChange={handleChange} checked={permissionBox.checkedG} name="checkedG" color="primary" />} label="Usuários" />
                      <FormControlLabel control={<Checkbox onChange={handleChange} checked={permissionBox.checkedH} name="checkedH" color="primary" />} label="Permissões" />
                    </Box></Grid>
                </Grid>
              </Grid>
            </FormGroup>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} size="large" color="primary">
            Cancel
          </Button>
          <Button onClick={dialogContent && dialogContent.id !== null ? handleDialogSendEditRole : handleDialogSendNewRole} size="large" className={dialogContent && dialogContent.id !== null ? classes.modalButtonEdit : classes.modalButtonRegister}>
            {dialogContent && dialogContent.id !== null ? 'Save Edit' : 'Register'}
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
            Do you want to remove the Role: <b>{removeDialogContent.name}</b> ?
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