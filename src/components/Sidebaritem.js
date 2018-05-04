import React from "react";

// This component creates a clickable button for lists in the sidebar element.

class Sidebaritem extends React.Component {
  // Event method for button clicks.
  handleClick = () => {
    this.props.addToViewCount(this.props.listKey);
    this.props.loadSelectedList(this.props.listKey);
  };

  render() {
    return (
      <button className="sidebar-list-button" onClick={this.handleClick}>
        {this.props.listName}
      </button>
    );
  }
}

export default Sidebaritem;
