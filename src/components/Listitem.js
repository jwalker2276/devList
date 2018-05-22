import React from "react";
// import Number from "./Number";
import ItemTitle from "./ItemTitle";
import ItemLink from "./ItemLink";
import ItemCost from "./ItemCost";
import ItemVotes from "./ItemVotes";
import VoteButton from "./VoteButton";
import { EditItemButton } from "./EditButton";
import { Comment, CommentEnd, ClosingBracket } from "./ItemSyntax";
import { getCostSymbol } from "../helper-functions";

// This component displays the a list item in a list

class Listitem extends React.Component {
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
        <VoteButton
          action="vote-up"
          itemName={this.props.itemName}
          itemInteraction={this.props.itemInteraction}
          listName={this.props.listName}
        />
        <VoteButton
          action="vote-down"
          itemName={this.props.itemName}
          itemInteraction={this.props.itemInteraction}
          listName={this.props.listName}
        />
        {/* Can the user edit */}
        {isOwner && (
          <EditItemButton
            flagItemForEdit={this.props.flagItemForEdit}
            objKey={objKey}
          />
        )}
      </div>
    );

    // if (isOwner && canVote) {
    //   // Can vote and edit
    //   return (
    //     <React.Fragment>
    //       <div className="list-numbers-box" />
    //       <div className="list-item-box">
    //         <Comment />
    //         <ItemTitle name={name} />
    //         <ItemLink link={link} />
    //         <ItemCost cost={cost} />
    //         <ItemVotes totalVotes={totalVotes} />
    //         <ClosingBracket />
    //         {/* Can vote */}
    //         {/* Can edit */}
    //         {itemButtons}
    //         <CommentEnd />
    //       </div>
    //     </React.Fragment>
    //   );
    // } else if (!isOwner && canVote) {
    //   // Can vote but not edit
    //   return (
    //     <React.Fragment>
    //       <div className="list-numbers-box" />
    //       <div className="list-item-box">
    //         <Comment />
    //         <ItemTitle name={name} />
    //         <ItemLink link={link} />
    //         <ItemCost cost={cost} />
    //         <ItemVotes totalVotes={totalVotes} />
    //         <ClosingBracket />
    //         {/* Can vote */}
    //         {itemButtons}
    //         <CommentEnd />
    //       </div>
    //     </React.Fragment>
    //   );
    // } else if (isOwner && !canVote) {
    //   return (
    //     // Can edit but not vote
    //     <React.Fragment>
    //       <div className="list-numbers-box" />
    //       <div className="list-item-box">
    //         <Comment />
    //         <ItemTitle name={name} />
    //         <ItemLink link={link} />
    //         <ItemCost cost={cost} />
    //         <ItemVotes totalVotes={totalVotes} />
    //         <ClosingBracket />
    //         {/* Can edit */}
    //         <EditItemButton
    //           flagItemForEdit={this.props.flagItemForEdit}
    //           objKey={objKey}
    //         />
    //         <CommentEnd />
    //       </div>
    //     </React.Fragment>
    //   );
    // }
    // try this
    if (canVote) {
      // if (isOwner && canVote) {
      // Can vote and edit
      return (
        <React.Fragment>
          <div className="list-numbers-box" />
          <div className="list-item-box">
            <Comment />
            <ItemTitle name={name} />
            <ItemLink link={link} />
            <ItemCost cost={cost} />
            <ItemVotes totalVotes={totalVotes} />
            <ClosingBracket />
            {/* Can vote and maybe edit */}
            {itemButtons}
            <CommentEnd />
          </div>
        </React.Fragment>
      );
      //
    } else if (!canVote && isOwner) {
      return (
        <React.Fragment>
          <div className="list-numbers-box" />
          <div className="list-item-box">
            <Comment />
            <ItemTitle name={name} />
            <ItemLink link={link} />
            <ItemCost cost={cost} />
            <ItemVotes totalVotes={totalVotes} />
            <ClosingBracket />
            {/* Can just edit */}
            <EditItemButton
              flagItemForEdit={this.props.flagItemForEdit}
              objKey={objKey}
            />
            <CommentEnd />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        // Can just view item
        <React.Fragment>
          <div className="list-numbers-box" />
          <div className="list-item-box">
            <Comment />
            <ItemTitle name={name} />
            <ItemLink link={link} />
            <ItemCost cost={cost} />
            <ItemVotes totalVotes={totalVotes} />
            <ClosingBracket />
            <CommentEnd />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Listitem;
