import React from "react";

const ItemLink = props => (
  <p className="item-text item-indent">
    <span className="item-this">this</span>
    <span className="item-period">.</span>link<span className="item-equal">
      {" "}
      ={" "}
    </span>
    <span className="item-string">"</span>
    <a className="item-link" href={`${props.link}`} target="_blank">{`${
      props.link
    }`}</a>
    <span className="item-string">"</span>&#59;
  </p>
);

export default ItemLink;
