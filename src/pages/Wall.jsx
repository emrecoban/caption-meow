import React from "react";
import Aside from "../components/Aside";
import { getUsers } from "../services/users";
import HonorUser from "../components/HonorUser";

export default function Wall(){
    const [honorList, setHonorList] = React.useState([])
    const [honorElement, setHonorElement] = React.useState(false)

    async function handleHonors(){
        try {
            setHonorList([])
            const honorRef = await getUsers()
            honorRef.forEach(data=>{
                setHonorList(prevUsers=>{
                    const newUser = {
                        Id: data.id,
                        displayName: data.data().displayName,
                        email: data.data().email,
                        score: data.data().score
                    }
                    return [...prevUsers, newUser]
                })
            })
        } catch (error) {
            console.log("Getting users has an error: ", error.message)
        }
    }

    React.useEffect(()=>{
        handleHonors()
    }, [])

    React.useEffect(()=>{
        console.log("tam liste: => ", honorList)
        const honorEl = honorList.map((user, i)=>{
            return (<HonorUser
                    key={user.Id}
                    displayName={user.displayName}
                    score={user.score}
                    rank={i+1}
             />)
        })
        setHonorElement(honorEl)
    }, [honorList])

    return (
        <main>
            <Aside />
            <div className="content">
                <h2 style={{textAlign: 'center'}}>🏆 Wall of Honor</h2>
                {
                    !honorElement 
                    ? (<div className="loader"></div>) 
                    : (<table id="honors">
                            <tbody>
                                {honorElement}
                            </tbody>
                        </table> )
                }
                
            </div>
        </main>
    )
}