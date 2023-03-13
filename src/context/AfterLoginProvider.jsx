import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

const AfterLoginContext = React.createContext(null)

export const AfterLoginProvider = ({children})=> {
    const navigate = useNavigate()
    const [user, setUser] = React.useState(null)

    React.useEffect(()=>{
        const loginControl = auth.onAuthStateChanged((user)=>{
            if(user){
                navigate('/')
            }else{
                setUser("noname")
            }
        })

        return () => loginControl()
    }, [user])

    return user && (
        <AfterLoginContext.Provider value={null}>
            {children}
        </AfterLoginContext.Provider>
    )
}