import React from "react";

const ItemTitle = props => (
  <p className="item-class">class <span className="item-title">{`${props.name}`}</span> <span className="item-text">&#123;</span></p>
);

export default ItemTitle;