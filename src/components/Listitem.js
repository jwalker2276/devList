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

    // Comment snippet
    const comment = (
      <p className="item-comment">// Item</p>
    );

    const commentEnd = (
      <p className="item-comment">// -----------------------------</p>
    );

    // Link for item
    const itemTitle = (
      <p className="item-class">class <span className="item-title">{`${name}`}</span> <span className="item-text">&#123;</span></p>
    );

    // Edit button snippet for owner
    const editBtn = (
      <button
        className="edit-btn"
        onClick={() => this.props.flagItemForEdit(objKey)}
      />
    );

    // Title for item
    const itemLink = (
      <p className="item-text item-indent"><span className="item-this">this</span><span className="item-period">.</span>link<span className="item-equal"> = </span><span className="item-string">"</span><a className="item-link" href={`${link}`}>{`${link}`}</a><span className="item-string">"</span>&#59;</p>
    );

    // Cost image
    const costImage = (
      <img
        className="item-cost-symbol"
        src={`${getCostSymbol(cost)}`}
        alt={`${alt}`}
      />
    );

    

    // Cost for item
    const itemCost = (
      <p className="item-text item-indent"><span className="item-this">this</span><span className="item-period">.</span>cost<span className="item-equal"> = </span><span className="item-string">"free, for now"</span>&#59;</p>
    );

    // Closing bracket
    const closingBracket = (
      <p className="item-text">&#125;</p>
    );

    const itemMid = (
      <p className="item-text">&#59;</p>
    )

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
          {comment}
          {itemTitle}
          {itemLink}
          {itemCost}
          {closingBracket}
          {/* Can edit */}
          {editBtn}
          {/* Can vote */}
          {itemButtons}
          {commentEnd}
        </div>
      );
    } else if (!isOwner && canVote) {
      // Can vote but not edit
      return (
        <div className="list-item-box">
          {comment}
          {itemTitle}
          {itemLink}
          {itemCost}
          {closingBracket}
          {/* Can vote */}
          {itemButtons}
          {commentEnd}
        </div>
      );
    } else if (isOwner && !canVote) {
      return (
        // Can edit but not vote
        <div className="list-item-box">
          {comment}
          {itemTitle}
          {itemLink}
          {itemCost}
          {closingBracket}
          {/* Can edit */}
          {editBtn}
          {commentEnd}
        </div>
      );
    } else {
      return (
        // Can just view item
        <div className="list-item-box">
          {comment}
          {itemTitle}
          {itemLink}
          {itemCost}
          {closingBracket}
          {commentEnd}
        </div>
      );
    }
  }
}

export default Listitem;
