import React from "react";

class EditItem extends React.Component {
  handleEvent = event => {
    const listKey = this.props.selectedList;
    const itemKey = this.props.itemKey;
    // The new item info to be passed to app.js method
    const keyToChange = event.currentTarget.name;
    const newValue = event.currentTarget.value;
    // Call method on app.js to change state
    this.props.editListItem(listKey, itemKey, keyToChange, newValue);
  };

  render() {
    const itemKey = this.props.itemKey;
    const listKey = this.props.selectedList;
    const lists = this.props.lists;
    // Check to make sure the listItem key is not null
    if (itemKey === null) {
      return <p>item was null</p>;
    }

    // Get the selected item to edit
    const selectedListItem = lists[listKey].items[itemKey];
    console.log(selectedListItem);
    return (
      <div className="edit-listitem-div">
        <p className="item-comment">// Change your items values</p>
        <div className="edit-listitem-grid">
          <div className=" add-listitem-line-one">
            <label>
              <span className="item-class">class </span>
            </label>
            <input
              type="text"
              name="name"
              value={selectedListItem.name}
              onChange={this.handleEvent}
            />
            <span className="item-class">
              extends{" "}
              <span className="item-title">
                selectedListItem.list <span className="item-text">&#123;</span>
              </span>
            </span>
          </div>
          {/* end of line one */}
          <div className="add-listitem-line-two item-indent">
            <label className="item-class">
              constructor{" "}
              <span className="item-text"> (cost, link) &#123;</span>
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
              type="text"
              name="link"
              value={selectedListItem.link}
              onChange={this.handleEvent}
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
            <select
              name="cost"
              value={selectedListItem.cost}
              onChange={this.handleEvent}
            >
              <option value="paid">Paid</option>
              <option value="free">Free</option>
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
          <button
            className="syntax-btn"
            onClick={() => this.props.flagItemForEdit(null)}
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}

export default EditItem;
