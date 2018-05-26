import React from "react";

const ListTitle = props => (
  <div className="list-title-tab">
    <h5 className="list-title">
      {props.title}
      <span className="item-text">.dev</span>
    </h5>
  </div>
);

export default ListTitle;
