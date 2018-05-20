import React from "react";

class ItemCost extends React.Component {
  // Determine cost of item
  getCostString = (cost) => {
    if (cost === "paid" || cost === "Paid") {
      return "cost money";
    } else {
      return "free";
    }
  };

  render() {
    return (
      <p className="item-text item-indent"><span className="item-this">this</span><span className="item-period">.</span>cost<span className="item-equal"> = </span><span className="item-string">{this.getCostString(this.props.cost)}</span>&#59;</p>
    );
  }
}

export default ItemCost;