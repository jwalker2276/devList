import React from "react";
import Listitem from "./Listitem";
import ListTitle from "./ListTitle";
import { EditListButton } from "./EditButton";
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

    // If owner is logged in
    if (isOwner) {
      // Check for an empty list
      if (items === "") {
        return (
          <div className="list-box">
            <ListTitle title={title} />
            <EditListButton flagListForEdit={this.props.flagListForEdit} />
          </div>
        );
      } else {
        return (
          <div className="list-box">
            <ListTitle title={title} />
            <EditListButton flagListForEdit={this.props.flagListForEdit} />
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
            <ListTitle title={title} />
          </div>
        );
      } else {
        return (
          <div className="list-box">
            <ListTitle title={title} />
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
