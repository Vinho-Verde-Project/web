import React from "react";
import { Route } from "react-router-dom";
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
  return (
    <Layout>
      <Route path="/" exact component={Dashboard} />
      {/* Materials */}
      <Route path="/warehouses" component={Warehouse} />
      <Route path="/stock" component={Stock} />
      <Route path="/products" component={Products} />
      <Route path="/categories" component={Categories} />
      <Route path="/wine" component={Wine} />
      {/* Production */}
      <Route path="/stages" component={Stages} />
      <Route path="/tasks" component={Tasks} />
      {/* Admin */}
      <Route path="/users" component={Users} />
      <Route path="/permissions" component={Permissions} />
    </Layout>
  );
}
