import React from "react";

export default function Aside() {
  return (
    <aside>
      <div className="sideContent">
        <img src="/images/aside-cat.svg" height="50" />
        <h1>
          Every day a new cat,
          <br />
          you write the caption.
        </h1>
        <div className="features">
          <h4>🖼 Every day a new cat</h4>
          <h4>💭 Post a funny caption</h4>
          <h4>🔺 Upvote your favorites</h4>
        </div>
        <a
          href="https://www.producthunt.com/posts/caption-meow?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-caption&#0045;meow"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=386540&theme=light"
            alt="Caption&#0032;Meow - social&#0032;network | Product Hunt"
            style={{ width: "180px", height: "54px" }}
            width="180px"
            height="54"
          />
        </a>
      </div>
      <div className="footer">
        &copy; 2023 Caption Meow ·{" "}
        <a href="https://github.com/emrecoban/caption-meow" target="_blank">
          GitHub
        </a>
      </div>
    </aside>
  );
}
