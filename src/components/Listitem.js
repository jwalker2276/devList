import React from "react";
import { getCostSymbol } from "../helper-functions";

// This component displays the a list item in a list

class Listitem extends React.Component {
  handleClick = event => {
    const itemName = this.props.itemName;
    const listName = this.props.listName;
    // Call method on app.js
    // event.target.name is vote-up, vote-down, or report
    this.props.itemInteraction(event.target.name, itemName, listName);
  };

  render() {
    const currentUser = this.props.currentUser;
    const {
      name,
      link,
      cost,
      alt,
      totalVotes,
      owner,
      objKey
    } = this.props.listItemInfo;

    // Flag to determine if current user is owner
    let isOwner = false;

    //Check for owner
    if (owner === currentUser) {
      isOwner = true;
    } else {
      isOwner = false;
    }

    // Flag to determine if current user can vote
    let canVote = false;

    // Check if user can vote
    if (this.props.userVoteCount > 0) {
      canVote = true;
    } else {
      canVote = false;
    }

    // Edit button snippet for owner
    const editBtn = (
      <button
        className="edit-btn"
        onClick={() => this.props.flagItemForEdit(objKey)}
      />
    );

    // Title and link for item
    const titleLink = (
      <a className="item-name-link" href={`${link}`}>{`${name}`}</a>
    );

    // Cost image
    const costImage = (
      <img
        className="item-cost-symbol"
        src={`${getCostSymbol(cost)}`}
        alt={`${alt}`}
      />
    );

    // Interactive buttons
    const itemButtons = (
      <div className="item-voter">
        <button
          name="vote-up"
          onClick={this.handleClick}
          className="vote-btn"
        />
        <span className="total-votes-span">{totalVotes}</span>
        <button
          name="vote-down"
          onClick={this.handleClick}
          className="vote-btn"
        />
        <button name="report" onClick={this.handleClick} className="vote-btn">
          report
          {`${name}`}
        </button>
      </div>
    );

    if (isOwner && canVote) {
      // Can vote and edit
      return (
        <div className="list-item">
          {titleLink}
          {/* Can edit */}
          {editBtn}
          {costImage}
          {/* Can vote */}
          {itemButtons}
        </div>
      );
    } else if (!isOwner && canVote) {
      // Can vote but not edit
      return (
        <div className="list-item">
          {titleLink}
          {costImage}
          {/* Can vote */}
          {itemButtons}
        </div>
      );
    } else if (isOwner && !canVote) {
      return (
        // Can edit but not vote
        <div className="list-item">
          {titleLink}
          {/* Can edit */}
          {editBtn}
          {costImage}
        </div>
      );
    } else {
      return (
        // Can just look at item
        <div className="list-item">
          {titleLink}
          {costImage}
        </div>
      );
    }
  }
}

export default Listitem;
