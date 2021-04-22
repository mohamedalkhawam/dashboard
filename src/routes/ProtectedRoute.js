import React from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
// import Layout from "../components/layout";
import { useSelector } from "react-redux";
import { useHistory } from "react";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authReducer = useSelector((state) => state.authReducer);
  console.log(authReducer);
  if (authReducer.loading) {
    return <div>Loading</div>;
  } else if (authReducer.isAuthenticated) {
    return (
      <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/auth",
        }}
      />
    );
  }
};

export default ProtectedRoute;
