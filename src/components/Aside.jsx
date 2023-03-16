import React from "react";

export default function Aside(){
    return(
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
                    &copy; 2023 Caption Meow · <a href="https://github.com/emrecoban/caption-meow" target="_blank">GitHub</a>
                </div>
            </aside>
    )
}