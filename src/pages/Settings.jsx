import React from "react";
import { AuthContext } from '../context/AuthProvider';
import { auth } from "../services/firebase";
import { 
    useUpdatePassword,
    useUpdateProfile 
} from 'react-firebase-hooks/auth';
import { reAuth } from "../services/users";


export default function Settings() {
    const { user } = React.useContext(AuthContext)

    const [updatePass, updatingPass, errorPass] = useUpdatePassword(auth);
    const [updateProfile, updating, error] = useUpdateProfile(auth);

    const [profile, setProfile] = React.useState(user?.displayName || "")
    const [profileRes, setProfileRes] = React.useState(false)

    const [password, setPassword] = React.useState({
        currPass: "",
        newPass: ""
    })
    const [passRes, setPassRes] = React.useState(false)
    const [loginErr, setLoginErr] = React.useState(false)

    async function handleProfile(e){
        e.preventDefault()
        const success = await updateProfile({ displayName: profile });
        if(success){
            setProfileRes(true)
        }
    }

    async function handlePass(e){
        e.preventDefault()
        try {
            const firstLogin = await reAuth(password.currPass)
            if(firstLogin){
                const successPass = await updatePass(password.newPass);
                if(successPass){
                    setPassRes(true)
                    setLoginErr(false)
                }
            }
        } catch (error) {
            setLoginErr(error.message)
        }
    }

    return (
        <div className="loginPage">
            <div className="container">
                <div className="loginLogo">
                    <img src="/images/settings-cat.svg" height="90" />
                </div>
                <h2>Settings</h2>
                <div className="birForm">
                <form onSubmit={handleProfile}>
                    <label htmlFor="email">
                        <strong>Name</strong>
                    </label>
                    <input type="text" 
                    name="displayName" 
                    id="displayName" 
                    placeholder="Enter a display name" 
                    required 
                    value={profile}
                    onChange={(e)=> setProfile(e.target.value)}
                    />

                    {
                        error && <h3 style={{color:'red'}}>{error.message}</h3>
                    }

                    {
                        profileRes ? ( <p style={{textAlign: 'center'}}>✅ Updated your profile!</p> ) : (
                            <button
                                disabled={updating}
                            >
                                {updating ? "Updating profile..." : "Update profile"}
                            </button>
                        )
                    }
                </form>
                <form onSubmit={handlePass}>
                    <label htmlFor="currPassword">
                        <strong>Current password</strong>
                        <i style={{
                            fontSize: "12px",
                            marginLeft: "5px"
                        }}>(If you want to change it)</i>
                    </label>
                    <input 
                    type="password" 
                    name="currPassword" 
                    id="currPassword" 
                    placeholder="Enter current password"
                    value={password.currPass}
                    onChange={(e)=>setPassword(prevState=>{
                        return {
                            ...prevState,
                            currPass: e.target.value
                        }
                    })}
                    required
                     />

                    <label htmlFor="newPassword">
                        <strong>New password</strong>
                    </label>
                    <input 
                    type="password" 
                    name="newPassword" 
                    id="newPassword" 
                    placeholder="Enter new password" 
                    value={password.newPass}
                    onChange={(e)=>setPassword(prevState=>{
                        return {
                            ...prevState,
                            newPass: e.target.value
                        }
                    })}
                    required
                    />

                    {
                        errorPass && <h3 style={{color:'red'}}>{errorPass.message}</h3>
                    }

                    {
                        loginErr && <h3 style={{color:'red'}}>{loginErr}</h3>
                    }

                    {
                        passRes ? ( <p style={{textAlign: 'center'}}>✅ Updated your password!</p> ) : (
                            <button
                                disabled={updatingPass}
                            >
                                {updatingPass ? "Updating password..." : "Update password"}
                            </button>
                        )
                    }
                </form>
                    </div>
            </div>
        </div>
    )
}