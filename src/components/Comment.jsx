import React from "react";
import { getDoc } from "firebase/firestore";
import { getVotes, voteComment } from "../services/votes";
import { commentScore } from "../services/comments";
import { userScoreUp } from "../services/users";

export default function Comment({
    score, 
    uId, 
    comment, 
    commentId, 
    loginUserId, 
    catId
}){
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [userData, setUserData] = React.useState(false);
    const [votes, setVotes] = React.useState([]);

    React.useEffect(()=>{
        const userRef = uId
        const getUserData = async () => {
            const userDoc = await getDoc(userRef)
            return userDoc.data()
        }
        getUserData().then(user=>setUserData(user))
    }, [])

    async function handleVotes(){
        setVotes([])
        const votes = await getVotes(commentId)
        votes.forEach(vote=>{
            setVotes(prevVotes=>{
                const newVote = {
                    Id: vote.id,
                    catId: vote.data().catId.id,
                    userId: vote.data().userId.id,
                    zaman: vote.data().zaman
                }
                return [...prevVotes, newVote]
            })
        })
    }

    React.useEffect(()=>{
        handleVotes()
        console.log("user bilgisi geldi=====>", loginUserId)
    }, [])

    async function voteComm(){
        setIsDisabled(true)
        await userScoreUp(uId.id)
        await commentScore(commentId)
        await voteComment(catId, loginUserId, commentId)
        handleVotes()
    }

    if(!userData){
        return (
            <div className="loader"></div>
        )
    }

    return (
        <div className="comment">
            <button
            className={loginUserId ? "commentScore" : "scoreNoLogin"}
            onClick={voteComm}
            disabled={votes.some(vote=>vote.userId === loginUserId) || isDisabled || !loginUserId}
             >🔺{votes.length}</button>
            <p className="displayName">{userData?.displayName}:</p>
            <p className="userComment">{comment}</p>
        </div>
    )
}