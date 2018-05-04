import React from "react";
import Sidebaritem from "./Sidebaritem";

// This component houses the sidebar element.

class Sidebar extends React.Component {
  render() {
    const { newestList } = this.props;
    const { mostPopularList } = this.props;

    // Wait for correct value
    if (isNaN(newestList)) {
      return null;
    }

    // Convert string to a number
    let newestListNumber = Number(newestList);
    let mostPopularListNumber = Number(mostPopularList);

    return (
      <section className="sidebar">
        <h2>Newest List</h2>
        <div className="sidebar-lists">
          <Sidebaritem
            key={newestList}
            listKey={newestList}
            listName={this.props.listsCategories.lists[newestListNumber].title}
            loadSelectedList={this.props.loadSelectedList}
            addToViewCount={this.props.addToViewCount}
          />
        </div>
        <h2>Most Popular List</h2>
        <div className="sidebar-lists">
          <Sidebaritem
            key={mostPopularList}
            listKey={mostPopularList}
            listName={
              this.props.listsCategories.lists[mostPopularListNumber].title
            }
            loadSelectedList={this.props.loadSelectedList}
            addToViewCount={this.props.addToViewCount}
          />
        </div>
        <h2>Categories</h2>
        <div className="sidebar-lists">
          {Object.keys(this.props.listsCategories.lists).map(key => (
            <Sidebaritem
              key={key}
              listKey={key}
              listName={this.props.listsCategories.lists[key].title}
              loadSelectedList={this.props.loadSelectedList}
              addToViewCount={this.props.addToViewCount}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default Sidebar;
