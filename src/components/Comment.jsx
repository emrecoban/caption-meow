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
  catId,
}) {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [userData, setUserData] = React.useState(false);
  const [votes, setVotes] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const userDoc = await getDoc(uId);
      setUserData(userDoc.data());
    })();
  }, []);

  async function handleVotes() {
    setVotes([]);
    let newVotes = [];
    const votes = await getVotes(commentId);
    votes.forEach((vote) => {
      newVotes.push({
        Id: vote.id,
        catId: vote.data().catId.id,
        userId: vote.data().userId.id,
        zaman: vote.data().zaman,
      });
    });
    setVotes(newVotes);
  }

  React.useEffect(() => {
    handleVotes();
  }, []);

  async function voteComm() {
    setIsDisabled(true);
    await userScoreUp(uId.id);
    await commentScore(commentId);
    await voteComment(catId, loginUserId, commentId);
    handleVotes();
  }

  if (!userData) {
    return <div className="loader"></div>;
  }

  return (
    <div className="comment">
      <div className="comment-score">
        <button
          className={loginUserId ? "vote-button" : "scoreNoLogin"}
          onClick={voteComm}
          disabled={
            votes.some((vote) => vote.userId === loginUserId) ||
            isDisabled ||
            !loginUserId
          }
        >
          <span className="vote-icon">🔺</span>
          <span className="vote-count">{votes.length}</span>
        </button>
      </div>
      <div className="comment-details">
        <p className="user-name">{userData?.displayName}:</p>
        <p className="user-comment">{comment}</p>
      </div>
    </div>
  );
}

{
  /* <div className="comment">
            <button
            className={loginUserId ? "commentScore" : "scoreNoLogin"}
            onClick={voteComm}
            disabled={votes.some(vote=>vote.userId === loginUserId) || isDisabled || !loginUserId}
             >🔺{votes.length}</button>
            <p className="displayName">{userData?.displayName}:</p>
            <p className="userComment">{comment}</p>
        </div> */
}
