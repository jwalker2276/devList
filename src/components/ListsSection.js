import React from "react";
import List from "./List.js";

class ListsSection extends React.Component {
  render() {
    return (
      <section className="section-list">
        <List
          lists={this.props.lists}
          selectedListName={this.props.selectedListName}
          itemInteraction={this.props.itemInteraction}
          editList={this.props.editList}
          userId={this.props.userId}
          flagListForEdit={this.props.flagListForEdit}
          flagItemForEdit={this.props.flagItemForEdit}
          userVoteCount={this.props.userVoteCount}
        />
      </section>
    );
  }
}

export default ListsSection;
