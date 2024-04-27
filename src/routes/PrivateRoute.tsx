import MainComponent from '../components/main';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/AuthService';
import React from 'react';

const  PrivateRoute = ({ children }: { children: JSX.Element })=> {
    // const isAuthenticate = {state:true,authorizedRoute:[1, 2, 3, 4, 5, 6]};
    const isAuthenticated = () => {
      return localStorage.getItem("user") ? true : false;
    };
    const data:any = localStorage.getItem("user");
    
    const userRole = JSON.parse(data);
    const allowedRoutes: number[] = [];
    switch (userRole?.role) {
      case "admin":
        allowedRoutes.push(1, 2, 3, 4, 6, 7, 100); // Assuming these are admin's allowed routes
        break;
      case "student":
        allowedRoutes.push(1, 2, 7, 100); // Assuming these are student's allowed routes
        break;
      case "lecturer":
        allowedRoutes.push(1, 3, 7, 100); // Assuming these are lecturer's allowed routes
        break;
      default:
        break;
    }
    const isRouteAllowed = (routeId: number) => {
      return allowedRoutes.includes(routeId);
    };
    
    return isAuthenticated() ? (
        <MainComponent>
          {children}
        </MainComponent>
    //     <MainComponent>
    //   {React.Children.map(children, (child) => {
    //     // Filter out the children routes based on user's role
    //     if (
    //       React.isValidElement(child) &&
    //       isRouteAllowed(child.props.id)
    //     ) {
    //       return child;
    //     }
    //     return null;
    //   })}
    // </MainComponent>
      ) : (
        <Navigate to='/login' />
      );
}

export default PrivateRoute