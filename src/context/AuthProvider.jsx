import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
    user: null,
    signOut: () => {}
})

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = React.useState(null)
    const signOutUser = () => signOut(auth)

    React.useEffect(()=>{
        const loginControl = auth.onAuthStateChanged((user)=>{
            if(user){
                setUser(user)
            }else{
                navigate('/login')
            }
        })

        return () => loginControl()
    }, [auth])

    const value = {
        user,
        signOut: signOutUser,
    }

    return user && (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}