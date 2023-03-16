import React from "react";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Header(){
    const [user, loading, error] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
      };

    const loginControl = ()=> {
        if(loading){
            return <div className="loader"></div>
        }
        if(error){
            console.log("useAuthState (react-firebase-hooks) gelen hata => ", error)
            return ""
        }
        if(user){
            return (
                <>
                    <Link to="/settings">⚙️ Settings</Link>
                    <Link onClick={logout}>🔐 Logout</Link>
                </>
            )
        }
        return <Link to="/login">🔐 Log-in</Link>
    }
    return (
        <header>
            <img src="/images/cat.svg" height="40" />
            <h3>Caption Meow</h3>
            <nav>
                <Link to="/">🚀 Today's Cat</Link>
                <Link to="">🏆 Top Ten</Link>
                {
                    loginControl()
                }
                
            </nav>
        </header>
    )
}