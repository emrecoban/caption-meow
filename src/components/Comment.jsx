import React from "react";

export default function Comment({score, uId, comment, commentId}){

    return (
        <div className="comment">
            <p className="commentScore">🔺{score}</p>
            <p className="displayName">{uId}:</p>
            <p className="userComment">{comment}</p>
        </div>
    )
}