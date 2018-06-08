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
        <p className="item-comment">{"//"} Add to this list</p>
        <form className="add-listitem-form" onSubmit={this.createListItem}>
          <div className=" add-listitem-line-one">
            <label>
              <span className="item-class">class </span>
            </label>
            <input
              name="item-title"
              ref={this.itemTitleRef}
              type="text"
              placeholder="Enter name here"
              required
              minLength="1"
              maxLength="25"
              pattern="[A-Za-z ]{1,25}"
              title="Letters and spaces only"
            />
            <span className="item-class">
              extends{" "}
              <span className="item-title">
                {listName} <span className="item-text">&#123;</span>
              </span>
            </span>
          </div>
          {/* end of line one */}
          <div className="add-listitem-line-two item-indent">
            <label className="item-class">
              constructor{" "}
              <span className="item-text"> (link, cost) &#123;</span>
            </label>
          </div>
          {/* end of line two */}
          <div className="add-listitem-line-three item-indent">
            <label className="item-this item-indent">
              this<span className="item-period">.</span>
              <span className="item-text">link</span>
              <span className="item-equal"> = </span>
            </label>
            <input
              name="item-link"
              ref={this.itemLinkRef}
              type="url"
              minLength="1"
              maxLength="50"
              placeholder="https://www.website-link.com"
              required
              title="A link with http:// or https://"
            />
            <span className="item-text">;</span>
          </div>
          {/* end of line three */}
          <div className="add-listitem-line-four item-indent">
            <label className="item-this item-indent">
              this<span className="item-period">.</span>
              <span className="item-text">cost</span>
              <span className="item-equal"> = </span>
            </label>
            <select name="cost" ref={this.itemCostRef}>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            <span className="item-text">;</span>
          </div>
          {/* end of line four */}
          <div className="add-listitem-line-five">
            <label className="form-closing item-text item-indent">&#125;</label>
          </div>
          {/* end of line five */}
          <div className="add-listitem-line-six">
            <p className="item-text">&#125;</p>
          </div>
          <button className="syntax-btn" type="submit">
            Add to list
          </button>
        </form>
      </div>
    );
  }
}

export default Addlistitem;
