import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { userControl, auth } from '../api/firebase'; 
import { signOut } from "firebase/auth";
import { AuthContext } from "./Layout";

export default function Header(){
    const {authControl, setAuthControl} = React.useContext(AuthContext)
    const navigate = useNavigate()

    React.useEffect(()=>{
        userControl().then(verify=>setAuthControl(prevState=>{
            return {...prevState, loggedIn: verify}
        }))
    },[])

    console.log("güncel authControl => ", authControl)

    function logOut(){
        signOut(auth)
        .then(()=>{
          navigate('/')
          setAuthControl({
            user: null,
            loggedIn: false
          })
        })
        .catch((error)=>{
          throw {
              message: "Failed to log-out the system",
              errorMessage: error.message,
              errorCode: error.code
          }
        })
      }

    return (
        <header>
            <img src="/images/cat.svg" height="40" />
            <h3>Caption Cat</h3>
            <nav>
                <Link to="/">🚀 Today's Cat</Link>
                <Link to="">🏆 Top Ten</Link>
                {
                    authControl.loggedIn 
                    ?<Link onClick={logOut}>🔐 Logout</Link>
                    :<Link to="/login">🔐 Log-in</Link>
                }
            </nav>
        </header>
    )
}