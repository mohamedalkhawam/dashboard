import React from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { useHistory } from "react";
import Auth from "../components/Auth/index";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authReducer = useSelector((state) => state.authReducer);
  console.log(authReducer);
  // if (authReducer.loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen  ">
  //       <div className="loader animate-spin   border-black relative ease-linear border-t-0 rounded-full border-8  w-24 h-24 bg-black">
  //         <div className="loader Infinity animate-pulse transform border-white  relative ease-linear border-t-0 rounded-full border-8  w-16 h-16 bg-white">
  //           {/* <div className="loader Infinity border-black relative ease-linear animate-spin  border-t-0 rounded-full border-8  w-10 h-10 bg-black">
  //               <div className="loader Infinity border-black -rotate-90 relative ease-linear border-t-0 rounded-full border-8  w-6 h-6 bg-black"></div>
  //             </div> */}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authReducer.isAuthenticated && !authReducer.loading) {
          return <Component {...props} {...rest} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/auth", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
