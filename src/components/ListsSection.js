import React from "react";
import List from "./List.js";

// This stateless functional component is the parent element for a list component.

const ListsSection = props => (
  <section className="list-section">
    <List
      lists={props.lists}
      selectedListName={props.selectedListName}
      itemInteraction={props.itemInteraction}
      editList={props.editList}
      userId={props.userId}
      flagListForEdit={props.flagListForEdit}
      flagItemForEdit={props.flagItemForEdit}
      userVoteCount={props.userVoteCount}
    />
  </section>
);

export default ListsSection;
