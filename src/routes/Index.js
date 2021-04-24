import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
const Auth = lazy(() => import("../pages/Auth"));
const Index = lazy(() => import("../pages/Index"));
const Users = lazy(() => import("../pages/users/Index"));
const UsersCrud = lazy(() => import("../pages/users/UsersCrud"));
const Services = lazy(() => import("../pages/services/Index"));
const ServicesCrud = lazy(() => import("../pages/services/ServicesCrud"));
const Plans = lazy(() => import("../pages/plans/Index"));
const PlansCrud = lazy(() => import("../pages/plans/PlansCrud"));
const Routes = () => {
  return (
    <Suspense
      fallback={
        <p></p>
        // <Layout>
        //   <Loader />
        // </Layout>
      }
    >
      <Switch>
        <ProtectedRoute exact path="/" component={Index} />
        <Route exact path="/auth" component={Auth} />
        {/* start User mangment */}
        <ProtectedRoute exact path="/users" component={Users} />
        <ProtectedRoute exact path="/users/:id/edit" component={UsersCrud} />
        <ProtectedRoute exact path="/users/new" component={UsersCrud} />
        {/* end User mangment */}

        {/* start Services mangment */}
        <ProtectedRoute exact path="/services" component={Services} />
        <ProtectedRoute
          exact
          path="/services/:id/edit"
          component={ServicesCrud}
        />
        <ProtectedRoute exact path="/services/new" component={ServicesCrud} />
        {/* end Services mangment */}

        {/* start User mangment */}
        <ProtectedRoute exact path="/plans" component={Plans} />
        <ProtectedRoute exact path="/plans/:id/edit" component={PlansCrud} />
        <ProtectedRoute exact path="/plans/new" component={PlansCrud} />
        {/* end User mangment */}
      </Switch>
    </Suspense>
  );
};

export default Routes;
