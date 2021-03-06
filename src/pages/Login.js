import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  Snackbar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import api from "../services/api"
import { useHistory, Redirect, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    background: "#FF5A5A",
    backgroundColor: "#FF5A5A",
  },
}));

function Login(props) {
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('WinnerUserPermissions')) {
      history.push('/dashboard');
    }
  },[])

  const classes = useStyles();
  const [errorMsg, setErrorMsg] = React.useState({
    show: false,
    msg: "",
  });

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(e) {
    if (email === "" || email == null) {
      return setErrorMsg({
        msg: "Erro: O Campo Email deve ser preenchido!",
        show: true,
      });
    }
    if (senha === "" || senha == null) {
      return setErrorMsg({
        msg: "Erro: O Campo Senha deve ser preenchido!",
        show: true,
      });
    }
    if (!email.includes("@") || !email.includes(".")) {
      return setErrorMsg({
        msg: "Erro: O Email não é valido! Verifique o campo e tente novamente!",
        show: true,
      });
    }
    
      const body = {
        query: `{
          employeeEmail (email:"${email}", password:"${senha}") {    
            id 
            lastName    
            role {
              id
              permission {
                id
              }  
            }
          }
        }`,
      };
    
      api
        .post("/", body)
        .then(({ data }) => {
          const { employeeEmail } = data;
          if (employeeEmail == null) {
            return setErrorMsg({
              msg: "Erro: Email ou Senha incorretos!",
              show: true,
            });
          } else {
            console.log(employeeEmail);
            localStorage.setItem('WinnerUserID', employeeEmail.id);
            localStorage.setItem('WinnerUserName', employeeEmail.lastName);
            localStorage.setItem('WinnerUserPermissions', employeeEmail.role.permission.id);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err)
          return setErrorMsg({
            msg: "Erro: Erro ao conectar com o servidor!",
            show: true,
          });
        });

    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Grid container>
          <Grid item xs></Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={`top,center`}
        open={errorMsg.show}
        onClose={() => setErrorMsg({ ...errorMsg, show: false })}
        autoHideDuration={4000}
        message={errorMsg.msg}
        ContentProps={{
          classes: {
            root: classes.error,
          },
        }}
      ></Snackbar>
    </Container>
  );
}

export default Login;
