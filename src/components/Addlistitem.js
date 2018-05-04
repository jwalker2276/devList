import React from "react";
import { formatName } from "../helper-functions";

// This component handles adding new list items to a list from the user.

class Addlistitem extends React.Component {
  // Refs to dom elements
  itemTitleRef = React.createRef();
  itemLinkRef = React.createRef();
  itemCostRef = React.createRef();

  createListItem = event => {
    // Stop form from submitting
    event.preventDefault();

    // Set current list name
    const listName = this.props.state.user.selectedList;

    const keyName = formatName(this.itemTitleRef.current.value);
    // Object containing input values from the user
    const listItem = {
      objKey: keyName,
      owner: this.props.userId,
      parentListKey: listName,
      timesReported: 0,
      totalVotes: 0,
      rank: 0,
      name: this.itemTitleRef.current.value,
      link: this.itemLinkRef.current.value,
      cost: this.itemCostRef.current.value,
      alt: "cost"
    };

    // Call function in app.js
    this.props.addListItem(listName, listItem);
    // Clear the form after submitted
    event.currentTarget.reset();
  };

  render() {
    // This current list defined in state
    const { selectedList } = this.props.state.user;

    // Check to see if firebase is done syncing
    if (!this.props.state.lists[selectedList]) {
      return null; // Display nothing
    }

    // Get the title of the current list
    const listName = this.props.state.lists[selectedList].title;

    return (
      <div className="add-listitem-div">
        <h2>Add to this list</h2>
        <form className="create-item-form" onSubmit={this.createListItem}>
          <label>{listName}</label>
          <input
            name="item-title"
            ref={this.itemTitleRef}
            type="text"
            placeholder="item title"
          />
          <input
            name="item-link"
            ref={this.itemLinkRef}
            type="text"
            placeholder="www.example.com"
          />
          <select name="cost" ref={this.itemCostRef}>
            <option value="paid">Paid</option>
            <option value="free">Free</option>
          </select>
          <button type="submit">Add to list</button>
        </form>
      </div>
    );
  }
}

export default Addlistitem;
