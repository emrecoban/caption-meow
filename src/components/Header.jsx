import React from "react";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Header(){
    const [user, loading, error] = useAuthState(auth);
    const [showMenu, setShowMenu] = React.useState(false)

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

    function isDisplay(){
        setShowMenu(!showMenu)
        console.log("MENÜ GSÖTERİMİ: ", showMenu)
    }

    return (
        <header>
            <div className="captionLogo">
                <img src="/images/cat.svg" height="40" />
                <h3>Caption Meow</h3>
            </div>
            <div className="headerMenu">
                <nav className={showMenu ? "show" : "hide"}>
                    <Link to="/">🚀 Today's Cat</Link>
                    <Link to="/wall">🏆 Wall of Honor</Link>
                    {
                        loginControl()
                    }
                    
                </nav>
                <img className="burgerMenu" src="/images/burger_menu_icon.svg" onClick={isDisplay} />
            </div>
        </header>
    )
}