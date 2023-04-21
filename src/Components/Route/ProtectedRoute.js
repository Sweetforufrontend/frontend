import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children}) => {
  // const { loading, isAuthenticated, user } = useSelector((state) => state.user);


    if(isAuthenticated === false){
      return <Navigate to={"/login"} />
    }
    return <Outlet />;
  // return (
  //   <Fragment>
  //     {loading === false && (
  //       <Route
  //         {...rest}
  //         render={(props) => {
  //           if (isAuthenticated === false) {
  //             return <Redirect to="/login" />;
  //           }

  //           if (isAdmin === true && user.role !== "admin") {
  //             return <Redirect to="/login" />;
  //           }

  //           return <Component {...props} />;
  //         }}
  //       />
  //     )}
  //   </Fragment>
  // );
};

export default ProtectedRoute;
