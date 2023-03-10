import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from './Layout';

export default function ProtectedRoute(){
    const {authControl} = React.useContext(AuthContext)

    return authControl.loggedIn ? <Navigate to='/' replace /> : <Outlet />
}