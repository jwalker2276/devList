import React from "react";
// import Number from "./Number";
import ItemTitle from "./ItemTitle";
import ItemLink from "./ItemLink";
import ItemCost from "./ItemCost";
import ItemVotes from "./ItemVotes";
import { EditItemButton } from "./EditButton";
import { Comment, CommentEnd, ClosingBracket } from "./ItemSyntax";
import { getCostSymbol } from "../helper-functions";

// This component displays the a list item in a list

class Listitem extends React.Component {
  handleClick = event => {
    const itemName = this.props.itemName;
    const listName = this.props.listName;
    // Call method on app.js
    // event.target.name is vote-up, vote-down, or report
    this.props.itemInteraction(event.target.name, itemName, listName);
    // Call method on user.js
    // Need to log what item was reported
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

    // Interactive buttons
    const itemButtons = (
      <div className="item-voter">
        <p className="item-comment">// Vote here or don't we don't care.</p>
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
        {/* Disabled reporting for now */}
        {/* <button name="report" onClick={this.handleClick} className="vote-btn">
          report
          {`${name}`}
        </button> */}
      </div>
    );

    if (isOwner && canVote) {
      // Can vote and edit
      return (
        <div className="list-item-box">
          <Comment />
          <ItemTitle name={name} />
          <ItemLink link={link} />
          <ItemCost cost={cost}/>
          <ItemVotes totalVotes={totalVotes} />
          <ClosingBracket />
          {/* Can vote */}
          {itemButtons}
          {/* Can edit */}
          <EditItemButton flagItemForEdit={this.props.flagItemForEdit} objKey={objKey}/>
          <CommentEnd />
        </div>
      );
    } else if (!isOwner && canVote) {
      // Can vote but not edit
      return (
        <div className="list-item-box">
          <Comment />
          <ItemTitle name={name} />
          <ItemLink link={link} />
          <ItemCost cost={cost}/>
          <ItemVotes totalVotes={totalVotes} />
          <ClosingBracket />
          {/* Can vote */}
          {itemButtons}
          <CommentEnd />
        </div>
      );
    } else if (isOwner && !canVote) {
      return (
        // Can edit but not vote
        <div className="list-item-box">
          <Comment />
          <ItemTitle name={name} />
          <ItemLink link={link} />
          <ItemCost cost={cost}/>
          <ItemVotes totalVotes={totalVotes} />
          <ClosingBracket />
          {/* Can edit */}
          <EditItemButton flagItemForEdit={this.props.flagItemForEdit} objKey={objKey} />
          <CommentEnd />
        </div>
      );
    } else {
      return (
        // Can just view item
        <div className="list-item-box">
          <Comment />
          <ItemTitle name={name} />
          <ItemLink link={link} />
          <ItemCost cost={cost}/>
          <ItemVotes totalVotes={totalVotes} />
          <ClosingBracket />
          <CommentEnd />
        </div>
      );
    }
  }
}

export default Listitem;
