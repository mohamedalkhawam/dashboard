import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
const Auth = lazy(() => import("../pages/Auth"));
const Index = lazy(() => import("../pages/Index"));
const Users = lazy(() => import("../pages/users/Index"));
const UsersCrud = lazy(() => import("../pages/users/UsersCrud"));
const Routes = () => {
  return (
    <Suspense
      fallback={
        <p>ss</p>
        // <Layout>
        //   <Loader />
        // </Layout>
      }
    >
      <Switch>
        <ProtectedRoute exact path="/" component={Index} />
        <Route exact path="/auth" component={Auth} />
        <ProtectedRoute exact path="/users" component={Users} />
        <ProtectedRoute exact path="/users/:id/edit" component={UsersCrud} />
        <ProtectedRoute exact path="/users/new" component={UsersCrud} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
