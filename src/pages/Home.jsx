import React from "react";
import { addComment, getComments } from "../services/comments";
import { getLastCat } from "../services/cats";
import { auth } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import Comment from '../components/Comment';

export default function Home(){
    const [user, loading, error] = useAuthState(auth);
    const [newCaption, setNewCaption] = React.useState("")
    const [todaysCat, setTodaysCat] = React.useState(false)
    const [comments, setComments] = React.useState([])
    const [commentsEl, setCommentsEl] = React.useState([])
    const [commentControl, setcommentControl] = React.useState(true)
    const [loader, setLoader] = React.useState(true)
    

    async function handleNewComment(e){
        e.preventDefault()
        const addNewComment = await addComment(
            user.uid, 
            newCaption, 
            todaysCat.Id
        )
        handleComments() // refresh comments!
        console.log("gelen yanıt=>", addNewComment)  
    }

    async function handleCat(){
        try {
            const lastCat = await getLastCat()
            lastCat.forEach(data=>{
                setTodaysCat({
                    Id: data.id,
                    date: data.data().date,
                    source: data.data().source,
                    sourceLink: data.data().sourceLink,
                    imgSrc: data.data().imgSrc
                })
            })
            

            console.log("bugünün kedisi =>", todaysCat)
        } catch (error) {
            console.log("Getting last cat and comments has an error: ", error.message)
        }
    }

    async function handleComments(){
        setComments([])
        setCommentsEl([])
        const commentsCat = await getComments(todaysCat.Id)
        commentsCat.forEach(comment=>{
            comment.data().uId === user.uid && setcommentControl(false)
            setComments(prevComments=>{
                const newComment = {
                    Id: comment.id,
                    uId: comment.data().uId,
                    comment: comment.data().comment,
                    commentScore: comment.data().commentScore
                }
                return [...prevComments, newComment]
            })
        }) 
    }

    React.useEffect(()=>{
        handleCat()
    }, [])

    React.useEffect(()=>{
        todaysCat.Id && handleComments()
    }, [todaysCat])

    React.useEffect(()=>{
        console.log("state geldi=> ", comments)
        if(comments.length > 0){
            const commsEl = comments.map((comm, i)=>{
                console.log("comm[i].commentScore:", comm.uId)
                return (<Comment
                    key={comm.Id}
                    score={comm.commentScore}
                    uId={comm.uId}
                    comment={comm.comment}
                    commentId={comm.Id}
                    />)
            })
            console.log("çıktı:", commsEl)
            setCommentsEl(commsEl)
        }else{
            setLoader(false)
        }
    }, [comments])

    



    return(
        <main>
            <aside>
                <div className="sideContent">
                    <img src="/images/aside-cat.svg" height="50" />
                    <h1>Every day a new cat,<br/>you write the caption.</h1>
                    <div className="features">
                        <h4>🖼 Every day a new cat</h4>
                        <h4>💭 Post a funny caption</h4>
                        <h4>🔺 Upvote your favorites</h4>
                    </div>
                </div>
                <div className="footer">
                    &copy; 2023 Caption Cat · <a href="https://github.com/emrecoban/caption-cat" target="_blank">GitHub</a>
                </div>
            </aside>
            <div className="content">
                {
                    !todaysCat ? (<div className="loader"></div>) : (
                        <>
                        <img className="todaysCat" src={todaysCat.imgSrc} />
                        <p className="catSource"><b>Source: </b> <a href={todaysCat.sourceLink} target="_blank">{todaysCat.source}</a></p> 
                        </>
                    ) 
                }
                <div className="comments">
                    {
                        loading && (<div className="loader"></div>)
                    }
                    {
                        user && commentControl && (
                            <div className="putComment">
                                <form onSubmit={handleNewComment}>
                                    <input 
                                    type="text" 
                                    name="newComment"
                                    placeholder="Enter a funny caption..."
                                    maxLength="75"
                                    autoComplete="off"
                                    value={newCaption}
                                    onChange={(e)=>setNewCaption(e.target.value)} 
                                    required />
                                    <button>💭 Post</button>
                                </form>
                            </div>
                        )
                    }
                    {
                        commentsEl.length === 0 && loader
                        ? (<div className="loader"></div>) 
                        : <>{commentsEl}</>
                    }
                </div>
            </div>
        </main>
    )
}