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
      <div className="editForm">
        <p className="edit-form-header">Change List Name</p>
        <input
          type="text"
          name="name"
          onChange={this.handleEvent}
          value={listName}
        />
        <button onClick={() => this.props.flagListForEdit()}>Done</button>
      </div>
    );
  }
}

export default Editlist;
