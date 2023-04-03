import React from "react";
import { addComment, getAllComments, getComments } from "../services/comments";
import { getLastCat } from "../services/cats";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";
import Aside from "../components/Aside";
import { getAllVotes } from "../services/votes";
import { getAllUsers } from "../services/users";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [newCaption, setNewCaption] = React.useState("");
  const [todaysCat, setTodaysCat] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [commentControl, setcommentControl] = React.useState(true);
  const [loader, setLoader] = React.useState(true);

  async function handleNewComment(e) {
    e.preventDefault();
    const addNewComment = await addComment(user.uid, newCaption, todaysCat.Id);
    handleComments(); // refresh comments!
  }

  async function handleCat() {
    try {
      setTodaysCat(await getLastCat());
    } catch (error) {
      console.log(
        "Getting last cat and comments has an error: ",
        error.message
      );
    }
  }

  async function handleComments() {
    setComments([]);
    const commentsCat = await getComments(todaysCat.Id);
    commentsCat.forEach((comment) => {
      comment.data().uId.id === user?.uid && setcommentControl(false);
      setComments((prevComments) => {
        const newComment = {
          Id: comment.id,
          uId: comment.data().uId,
          comment: comment.data().comment,
          commentScore: comment.data().commentScore,
        };
        return [...prevComments, newComment];
      });
    });
  }

  React.useEffect(() => {
    handleCat();
  }, []);

  React.useEffect(() => {
    todaysCat.Id && handleComments();
  }, [todaysCat]);

  const commentElements = React.useMemo(() => {
    //setLoader(false)
    return comments
      .sort((a, b) => b.commentScore - a.commentScore)
      .map((comm) => (
        <Comment
          key={comm.Id}
          score={comm.commentScore}
          uId={comm.uId}
          comment={comm.comment}
          commentId={comm.Id}
          loginUserId={user && user?.uid}
          catId={todaysCat.Id}
        />
      ));
  }, [comments]);
  
  // PROMISE ALL --- START
/*   const [comments_, setComments_] = React.useState([])
  const [users_, setUsers_] = React.useState([])
  const [votes_, setVotes_] = React.useState([])

  React.useEffect(()=>{
    Promise.all([getAllComments(), getAllUsers(), getAllVotes()])
    .then(([commentsData, usersData, votesData])=>{
      setComments_(commentsData)
      setUsers_(usersData)
      setVotes_(votesData)
    }).catch((error)=>{
      console.log("Veriler gelirken hata meydana geldi: ", error)
    })
  },[])

  React.useEffect(()=>{
    console.log("İşte verilerin tamamı => ", comments_, users_, votes_)

    // "(9 Oy) - nickname: yorum" şeklinde göster:
    comments_.map((comment)=>{
      const user = users_.find((user) => user.Id === comment.uId);
      const votes = votes_.filter((vote) => vote.commId === comment.Id);
      console.log("YORUM => ", votes.length, user.displayName, comment.comment)
    })
  }, [comments_, users_, votes_]) */
  // PROMISE ALL --- END

  return (
    <main>
      <Aside />
      <div className="content">
        {!todaysCat ? (
          <div className="loader"></div>
        ) : (
          <>
            <img
              className="todaysCat"
              src={todaysCat.imgSrc}
              alt="Today's Cat"
              loading="lazy"
            />
            <p className="catSource">
              <b>Source: </b>{" "}
              <a href={todaysCat.sourceLink} target="_blank">
                {todaysCat.source}
              </a>
            </p>
          </>
        )}
        <div className="comments">
          {loading && <div className="loader"></div>}
          {!user && (
            <p style={{ fontSize: "14px" }}>
              🌟 Wanna post a funny caption? Log in first!{" "}
              <Link to="/login">Click here</Link>.
            </p>
          )}
          {user && commentControl && (
            <div className="putComment">
              <form onSubmit={handleNewComment}>
                <input
                  type="text"
                  name="newComment"
                  placeholder="Enter a funny caption..."
                  maxLength="75"
                  autoComplete="off"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  required
                />
                <button>💭 Post</button>
              </form>
            </div>
          )}
          {commentElements.length === 0 && loader ? (
            <div className="loader"></div>
          ) : (
            <>{commentElements}</>
          )}
        </div>
      </div>
    </main>
  );
}
