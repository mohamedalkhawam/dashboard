import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Test from '../pages/Test';

import ProtectedRoute from './ProtectedRoute';
const Auth = lazy(() => import('../pages/Auth'));
const Index = lazy(() => import('../pages/Index'));
const Users = lazy(() => import('../pages/users/Index'));
const UsersCrud = lazy(() => import('../pages/users/UsersCrud'));
const Services = lazy(() => import('../pages/services/Index'));
const ServicesCrud = lazy(() => import('../pages/services/ServicesCrud'));
const Plans = lazy(() => import('../pages/plans/Index'));
const PlansCrud = lazy(() => import('../pages/plans/PlansCrud'));
const Roles = lazy(() => import('../pages/roles/Index'));
const RolesCrud = lazy(() => import('../pages/roles/rolesCrud'));
const permissions = lazy(() => import('../pages/permissions/Index'));
const permissionsCrud = lazy(() =>
  import('../pages/permissions/permissionsCrud')
);
const City = lazy(() => import('../pages/city/Index'));
const CityCrud = lazy(() => import('../pages/city/CityCrud'));
const Buildings = lazy(() => import('../pages/buildings/Index'));
const BuildingsCrud = lazy(() => import('../pages/buildings/BuildingsCrud'));
const Orders = lazy(() => import('../pages/orders/Index'));
// const OrdersCrud = lazy(() => import("../pages/orders/OrdersCrud"));
const ScheduledWashes = lazy(() => import('../pages/scheduledWashes/Index'));
const ScheduledWashesCrud = lazy(() =>
  import('../pages/scheduledWashes/ScheduledWashesCrud')
);
const Intro = lazy(() => import('../pages/intro/Index'));
const IntroCrud = lazy(() => import('../pages/intro/IntroCrud'));
const Routes = () => {
  return (
    <Suspense fallback={<Layout>{/* <Loader /> */}</Layout>}>
      <Switch>
        <ProtectedRoute exact path='/' component={Index} />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/test' component={Test} />
        {/* start User mangment */}
        <ProtectedRoute exact path='/users' component={Users} />
        <ProtectedRoute exact path='/users/:id/edit' component={UsersCrud} />
        <ProtectedRoute exact path='/users/new' component={UsersCrud} />
        {/* end User mangment */}

        {/* start Services mangment */}
        <ProtectedRoute exact path='/services' component={Services} />
        <ProtectedRoute
          exact
          path='/services/:id/edit'
          component={ServicesCrud}
        />
        <ProtectedRoute exact path='/services/new' component={ServicesCrud} />
        {/* end Services mangment */}

        {/* start User mangment */}
        <ProtectedRoute exact path='/plans' component={Plans} />
        <ProtectedRoute exact path='/plans/:id/edit' component={PlansCrud} />
        <ProtectedRoute exact path='/plans/new' component={PlansCrud} />
        {/* end User mangment */}

        {/* start Roles mangment */}
        <ProtectedRoute exact path='/roles' component={Roles} />
        <ProtectedRoute exact path='/roles/:id/edit' component={RolesCrud} />
        <ProtectedRoute exact path='/roles/new' component={RolesCrud} />
        {/* end Roles mangment */}

        {/* start Permissions mangment */}
        <ProtectedRoute exact path='/permissions' component={permissions} />
        <ProtectedRoute
          exact
          path='/permissions/:id/edit'
          component={permissionsCrud}
        />
        <ProtectedRoute
          exact
          path='/permissions/new'
          component={permissionsCrud}
        />

        {/* end Permissions mangment */}

        {/* start City mangment */}
        <ProtectedRoute exact path='/city' component={City} />
        <ProtectedRoute exact path='/city/:id/edit' component={CityCrud} />
        <ProtectedRoute exact path='/city/new' component={CityCrud} />
        {/* end City mangment */}

        {/* start Buildings mangment */}
        <ProtectedRoute exact path='/buildings' component={Buildings} />
        <ProtectedRoute
          exact
          path='/buildings/:id/edit'
          component={BuildingsCrud}
        />
        <ProtectedRoute exact path='/buildings/new' component={BuildingsCrud} />
        {/* end Buildings mangment */}

        {/* start Orders mangment */}
        <ProtectedRoute exact path='/orders' component={Orders} />
        {/* <ProtectedRoute exact path="/orders/:id/edit" component={OrdersCrud} />
        <ProtectedRoute exact path="/orders/new" component={OrdersCrud} /> */}
        {/* end Orders mangment */}

        {/* Start scheduled a Washes mangment */}
        <ProtectedRoute
          exact
          path='/scheduledWashes'
          component={ScheduledWashes}
        />
        <ProtectedRoute
          exact
          path='/scheduledWashes/:id/edit'
          component={ScheduledWashesCrud}
        />
        <ProtectedRoute
          exact
          path='/scheduledWashes/new'
          component={ScheduledWashesCrud}
        />
        {/* end scheduled a Washes mangment */}

        {/* Start Intro mangment */}
        <ProtectedRoute exact path='/intro' component={Intro} />
        <ProtectedRoute exact path='/intro/:id/edit' component={IntroCrud} />
        <ProtectedRoute exact path='/intro/new' component={IntroCrud} />
        {/* end Intro mangment */}
      </Switch>
    </Suspense>
  );
};

export default Routes;
