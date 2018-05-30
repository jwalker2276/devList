import React from "react";

class Editlist extends React.Component {
  handleEvent = event => {
    // Value on input
    const updatedName = event.currentTarget.value;
    // Call method on app component
    this.props.editList(this.props.selectedList, updatedName);
  };

  render() {
    const listKey = this.props.selectedList;
    const listName = this.props.lists[listKey].title;

    return (
      <div className="edit-list-div">
        <p className="item-comment">{"//"} Edit your list</p>
        <div className="edit-list-grid">
          <p className="item-class">
            const <span className="item-text">list</span>
            <span className="item-equal"> = </span>
            <span className="item-number">new </span>
          </p>
          <input
            type="text"
            name="name"
            onChange={this.handleEvent}
            value={listName}
          />
          <span className="item-text add-list-end">&#40;&#41;&#59;</span>
        </div>
        <button
          className="syntax-btn"
          onClick={() => this.props.flagListForEdit()}
        >
          Done
        </button>
      </div>
    );
  }
}

export default Editlist;
