import React from "react";

const ItemVotes = props => (
  <p className="item-text item-indent"><span className="item-this">this</span><span className="item-period">.</span>totalVotes<span className="item-equal"> = </span><span className="item-number">{`${props.totalVotes}`}</span>&#59;</p>
);

export default ItemVotes;