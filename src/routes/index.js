import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import useStores from "../stores/useStores";
import { observer } from "mobx-react";

function Routes() {
  const userID = localStorage.getItem('WinnerUserID');

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}/>
        {userID ? (
					<Route component={PrivateRoutes} />
				) : (
					<Redirect to="/login" />
				)}
      </Switch>
    </BrowserRouter>
  );
}

export default observer(Routes);