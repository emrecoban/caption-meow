import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "./Header";

export const AuthContext = React.createContext(null) 

export default function Layout(){
    const [authControl, setAuthControl] = React.useState({
        user: null,
        loggedIn: false
    })

    return (
        <AuthContext.Provider value={{authControl, setAuthControl}}>
            <Header />
            <Outlet />
        </AuthContext.Provider>
    )
}