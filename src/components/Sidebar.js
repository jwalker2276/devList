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
      <section className="section-sidebar">
        <h5 className="sidebar-section-title sidebar-padding">List Explorer</h5>
        <p className="sidebar-list-title sidebar-padding">
          &#8895; Newest List
        </p>
        <div className="sidebar-lists-container sidebar-padding">
          <Sidebaritem
            key={newestList}
            listKey={newestList}
            selectedList={this.props.selectedList}
            listName={this.props.listsCategories.lists[newestListNumber].title}
            loadSelectedList={this.props.loadSelectedList}
            addToViewCount={this.props.addToViewCount}
          />
        </div>
        <p className="sidebar-list-title sidebar-padding">
          &#8895; Most Popular List
        </p>
        <div className="sidebar-lists-container sidebar-padding">
          <Sidebaritem
            key={mostPopularList}
            listKey={mostPopularList}
            selectedList={this.props.selectedList}
            listName={
              this.props.listsCategories.lists[mostPopularListNumber].title
            }
            loadSelectedList={this.props.loadSelectedList}
            addToViewCount={this.props.addToViewCount}
          />
        </div>
        <p className="sidebar-list-title sidebar-padding">&#8895; Categories</p>
        <div className="sidebar-lists-container sidebar-padding">
          {Object.keys(this.props.listsCategories.lists).map(key => (
            <Sidebaritem
              key={key}
              listKey={key}
              selectedList={this.props.selectedList}
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
