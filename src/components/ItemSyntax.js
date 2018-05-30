import React from "react";

export const Comment = () => <p className="item-comment">{"//"} Item</p>;

export const CommentEnd = () => (
  <p className="item-comment">{"// -----------------------------"}</p>
);

export const ClosingBracket = () => <p className="item-text">&#125;</p>;

export const EmptyListComment = () => (
  <React.Fragment>
    <div className="list-numbers-box" />
    <div className="list-item-box">
      <p className="item-comment">{"//"} Nothing here yet, add something.</p>
    </div>
  </React.Fragment>
);
