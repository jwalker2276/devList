import React from "react";

// This component creates a clickable button for lists in the sidebar element.

class Sidebaritem extends React.Component {
  // Event method for button clicks.
  handleClick = () => {
    this.props.loadSelectedList(this.props.listKey);
    // this.props.addToViewCount(this.props.listKey);

    // If on mobile close sidebar too.
    if (this.props.windowSize === "mobile") {
      this.props.uiCommands("closeSidebar");
    }
  };

  render() {
    const { listKey, selectedList } = this.props;

    if (listKey === selectedList) {
      return (
        <button
          className="sidebar-list-button selected"
          onClick={this.handleClick}
        >
          {this.props.listName}
        </button>
      );
    } else {
      return (
        <button className="sidebar-list-button" onClick={this.handleClick}>
          {this.props.listName}
        </button>
      );
    }
  }
}

export default Sidebaritem;
