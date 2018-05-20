import React from "react";
import Listitem from "./Listitem";

// This component displays the lists and items from state

class List extends React.Component {
  render() {
    // Get current listName and state.lists
    const listName = this.props.selectedListName;
    const lists = this.props.lists;

    // Check to see if firebase is done syncing
    if (!lists[listName]) {
      return null; // return null to not display anything
    }

    // Setup info
    const title = lists[listName].title;
    const items = lists[listName].items;
    const owner = lists[listName].owner;
    const currentUser = this.props.userId;
    // Flag to determine if current user is owner
    let isOwner = false;

    //Check for list owner
    if (owner === currentUser) {
      isOwner = true;
    } else {
      isOwner = false;
    }

    // Sort the items so components are displayed based on votes
    let sortedItems = Object.values(items).sort((a, b) => b.rank - a.rank);

    // List title snippet
    const listTitle = (
      <div className="list-heading">
        <div className="list-title-tab">
          <h3 className="list-title">{title}<span className="item-text">.js</span></h3>
        </div>
      </div>
    );


    // Edit button snippet for owner
    const editListBtn = (
      <button
        className="edit-btn"
        onClick={() => this.props.flagListForEdit()}
      />
    );

    // If owner is logged in
    if (isOwner) {
      // Check for an empty list
      if (items === "") {
        return (
          <div className="list-box">
            {listTitle}
            {editListBtn}
          </div>
        );
      } else {
        return (
          <div className="list-box">
            {listTitle}
            {editListBtn}
            <div className="list-items">
              {/* Display the sorted items */}
              {sortedItems.map((item, index) => (
                <Listitem
                  key={item.objKey}
                  itemName={item.objKey}
                  listItemInfo={item}
                  listName={this.props.selectedListName}
                  itemInteraction={this.props.itemInteraction}
                  currentUser={this.props.userId}
                  flagItemForEdit={this.props.flagItemForEdit}
                  userVoteCount={this.props.userVoteCount}
                />
              ))}
            </div>
          </div>
        );
      }
    } else {
      // Check for an empty list
      if (items === "") {
        return (
          <div className="list-box">
            {listTitle}
          </div>
        );
      } else {
        return (
          <div className="list-box">
            {listTitle}
            <div className="list-items">
              {/* Display the sorted items */}
              {sortedItems.map((item, index) => (
                <Listitem
                  key={item.objKey}
                  itemName={item.objKey}
                  listItemInfo={item}
                  listName={this.props.selectedListName}
                  itemInteraction={this.props.itemInteraction}
                  currentUser={this.props.userId}
                  flagItemForEdit={this.props.flagItemForEdit}
                  userVoteCount={this.props.userVoteCount}
                />
              ))}
            </div>
          </div>
        );
      }
    }
  }
}

export default List;
