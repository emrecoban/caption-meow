import React from "react";

export default function Home(){

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
                <img className="todaysCat" src="https://static.india.com/wp-content/uploads/2015/10/538.jpg?impolicy=Medium_Resize&w=1200&h=800" />
                <p className="catSource"><b>Source: </b> <a href="#something" target="_blank">CNN UK News</a></p>
                <div className="comments">
                    <div className="comment">
                        <p className="commentScore">🔺10</p>
                        <p className="displayName">emrecoban:</p>
                        <p className="userComment">Not funny!</p>
                    </div>
                    <div className="comment">
                        <p className="commentScore">🔺9</p>
                        <p className="displayName">John:</p>
                        <p className="userComment">What a cHat!</p>
                    </div>
                    <div className="comment">
                        <p className="commentScore">🔺5</p>
                        <p className="displayName">Nicola:</p>
                        <p className="userComment">hom hım hom</p>
                    </div>
                    <div className="comment">
                        <p className="commentScore">🔺2</p>
                        <p className="displayName">Chiara:</p>
                        <p className="userComment">me with my cat.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}