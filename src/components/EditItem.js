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
    //Need listkey, itemkey, list object

    const itemKey = this.props.itemKey;
    const listKey = this.props.selectedList;
    const lists = this.props.lists;

    // Check to make sure the listItem key is not null
    if (itemKey === null) {
      return <p>item was null</p>;
    }

    // Get the selected item to edit
    const selectedListItem = lists[listKey].items[itemKey];
    return (
      <div className="editForm">
        <p className="edit-form-header">Change item info</p>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={selectedListItem.name}
          onChange={this.handleEvent}
        />
        <label>Link</label>
        <input
          type="text"
          name="link"
          value={selectedListItem.link}
          onChange={this.handleEvent}
        />
        <label>Cost</label>
        <select
          name="cost"
          value={selectedListItem.cost}
          onChange={this.handleEvent}
        >
          <option value="paid">Paid</option>
          <option value="free">Free</option>
        </select>
        <button onClick={() => this.props.flagItemForEdit(null)}>Done</button>
      </div>
    );
  }
}

export default EditItem;
