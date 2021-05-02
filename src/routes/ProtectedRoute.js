import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import { useHistory } from 'react';
import Auth from '../components/Auth/index';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  component: Component,
  appReducer,
  isAuthenticated,
  loading,
  location,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        loading && !isAuthenticated ? (
          <div className='relative flex flex-col app bg-gray-p'>
            {/* <Spinner /> */}
          </div>
        ) : (
          // !isAuthenticated ? (
          //   <Redirect to="/login" />
          // ) :
          isAuthenticated && !loading && <Component {...props} {...rest} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  loading: state.authReducer.loading,
  isAuthenticated: state.authReducer.isAuthenticated,
  appReducer: state.appReducer,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
