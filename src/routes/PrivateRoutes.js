import React,{useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layouts";
import Users from "../pages/Users";
import Tasks from "../pages/Tasks";
import Stages from "../pages/Stages";
import Permissions from "../pages/Permissions";
import Wine from "../pages/Wine";
import Stock from "../pages/Stock";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Warehouse from "../pages/Warehouse";

export default function PrivateRoutes() {
  const [permissionsMap,setPermissionsMap] = useState({
      128: '/permissions',
      64: '/users',
      32: '/tasks',
      16: '/stages',
      8: '/wine',
      4: '/products',
      2: '/stock',
      1: '/categories',
  });

  function calcPermissionLevel(entrada, start=128) {
    if (entrada <= 0) {
        return;
    } else {
        if(entrada >= start) {
              setPermissionsMap((state) => ({
                ...state,
                [start]: true,
              }))
            return calcPermissionLevel(entrada-start,(start/2));
        } else {
            setPermissionsMap((state) => ({
              ...state,
              [start]: false,
            }))
            return calcPermissionLevel(entrada, (start/2));
        }
    }
  }

  useEffect(() => {
      calcPermissionLevel(localStorage.getItem('WinnerUserPermissions'));
  },[]);

  return (
    <Layout>
      <Route path="/" exact component={Dashboard} />
      {/* Materials */}
      <Route path="/warehouses" component={Warehouse} />

      { permissionsMap[1] === true ? (
      <Route path="/categories" component={Categories} />
      ) : (
        <Redirect to="/" />
      )}

      { permissionsMap[2] === true ? (
        <Route path="/stock" component={Stock} />
      ) : (
        <Redirect to="/" />
      )}

      { permissionsMap[4] === true ? (
        <Route path="/products" component={Products} />
      ) : (
        <Redirect to="/" />
      )}

      { permissionsMap[8] === true ? (
      <Route path="/wine" component={Wine} />
      ) : (
        <Redirect to="/" />
      )}

      {/* Production */}

      { permissionsMap[16] === true ? (
      <Route path="/stages" component={Stages} />
      ) : (
        <Redirect to="/" />
      )}

      { permissionsMap[32] === true ? (
      <Route path="/tasks" component={Tasks} />
      ) : (
        <Redirect to="/" />
      )}

      {/* Admin */}
      { permissionsMap[64] === true ? (
      <Route path="/users" component={Users} />
      ) : (
        <Redirect to="/" />
      )}

      { permissionsMap[128] === true ? (
      <Route path="/permissions" component={Permissions} />
      ) : (
        <Redirect to="/" />
      )}
    </Layout>
  );
}
