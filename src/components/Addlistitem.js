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

    // <div className="add-list-div">
    //   <p className="item-comment">// Add your new list</p>
    //   <div className="add-list-grid">
    //     <p className="item-class">
    //       const <span className="item-text">list</span>
    //       <span className="item-equal"> = </span>
    //       <span className="item-number">new </span>
    //     </p>
    //     <form className="add-list-form add-list-mid" onSubmit={this.createList}>
    //       <input
    //         name="list-name"
    //         ref={this.titleRef}
    //         type="text"
    //         placeholder="List name"
    //       />
    //       <button type="submit">Add List</button>
    //     </form>
    //     <span className="item-text add-list-end">&#40;&#41;&#59;</span>
    //   </div>
    // </div>;

    // { listName }

    return (
      <div className="add-listitem-div">
        <p className="item-comment">// Add to this list</p>
        <form className="add-listitem-form" onSubmit={this.createListItem}>
          <label>
            <span className="item-class">class </span>
          </label>
          <input
            name="item-title"
            ref={this.itemTitleRef}
            type="text"
            placeholder="item title"
          />
          <span className="item-class">
            extends{" "}
            <span className="item-title">
              {listName} <span className="item-text">&#123;</span>
            </span>
          </span>
          <div className="form-details-indented-one item-indent">
            <label className="item-class">
              constructor{" "}
              <span className="item-text"> (cost, link) &#123;</span>
            </label>
            <div className="form-details-indented-two item-indent">
              <label className="item-this">
                this<span className="item-period">.</span>
                <span className="item-text">link</span>
                <span className="item-equal"> = </span>
              </label>
              <input
                name="item-link"
                ref={this.itemLinkRef}
                type="text"
                placeholder="www.example.com"
              />
              <span className="item-text">;</span>
              <label className="item-this">
                this<span className="item-period">.</span>
                <span className="item-text">cost</span>
                <span className="item-equal"> = </span>
              </label>
              <select name="cost" ref={this.itemCostRef}>
                <option value="paid">Paid</option>
                <option value="free">Free</option>
              </select>
              <span className="item-text">;</span>
              <label className="form-closing item-text">&#125;</label>
            </div>
          </div>
          <button type="submit">Add to list</button>
          <p className="item-text">&#125;</p>
        </form>
      </div>
    );
  }
}

export default Addlistitem;
