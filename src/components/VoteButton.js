import React from "react";

class VoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { action, itemName, listName } = this.props;
    // Call method on app.js
    this.props.itemInteraction(action, itemName, listName);
  }

  render() {
    return (
      <button onClick={this.handleClick} className="vote-btn">
        &#60; {this.props.action} &#47;&#62;
      </button>
    );
  }
}

export default VoteButton;
