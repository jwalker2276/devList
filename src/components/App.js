import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ListsSection from "./ListsSection";
import User from "./User";
import starterLists from "../starter-list";
// import firebase from "firebase";
import base from "../base";
import { formatName } from "../helper-functions";

class App extends React.Component {
  state = {
    lists: {},
    user: {
      lastSelectedList: null,
      selectedList: null,
      uid: null,
      votes: -1
    },
    maxReportedTimes: 3,
    initialVotes: 3,
    editListFlag: false,
    editItemFlag: null,
    reportedItem: null
  };

  //********************
  // Lifecycle methods
  //********************

  // Check for page load
  componentDidMount() {
    const localStorageRef = localStorage.getItem("user");

    //If not null
    if (localStorageRef) {
      this.setState({ user: JSON.parse(localStorageRef) });
    }

    //Sync firebase
    this.ref = base.syncState("lists", {
      context: this,
      state: "lists"
    });
  }

  // Lifecycle method
  // Checking for change
  componentDidUpdate() {
    //Update local storage
    localStorage.setItem(
      "selectedList",
      JSON.stringify(this.state.user.selectedList)
    );

    // Check to see if user logged out.
    // This is done by checking the user.uid for a null condition.
    if (this.state.user.uid === null && this.state.user.votes !== -1) {
      // Copy the current user state
      const user = { ...this.state.user };
      // Set the votes back to the initial state
      user.votes = -1;
      // Merge state
      this.setState({ user: user });
    }
  }

  // Called when unmounted
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  //******************************
  // Adding and modifying methods
  //******************************

  // Add new list with title and empty items object
  addList = list => {
    // Take a copy of current state
    const lists = { ...this.state.lists };

    //Get number of last list
    for (let i in lists) {
      var listNumber = i;
      //Just want the first obj
      break;
    }

    // Add new list to the lists collection
    lists[`${--listNumber}`] = list;

    // Set the new lists collection to state
    this.setState({ lists: lists });
  };

  // Add new listitem to specific list
  addListItem = (listId, listItem) => {
    const formatedItemName = formatName(listItem.name);

    // Take a copy of the current state
    //const lists = { ...this.state.lists };
    const lists = { ...this.state.lists };

    //Check for new list
    if (this.state.lists[listId].items === "") {
      lists[listId].items = {};
    }

    // Add list item to selected list
    lists[listId].items[formatedItemName] = listItem;

    // Set the new lists collection to state
    this.setState({ lists: lists });
  };

  // Toggle flag in this.state when cog icon is clicked
  flagListForEdit = () => {
    // Copy current state
    let editState = this.state.editListFlag;
    // Switch flag
    editState = !editState;
    // Set state
    this.setState({ editListFlag: editState });
  };

  // Toggle flag in this.state when cog icon is clicked
  flagItemForEdit = flagInfo => {
    // Copy current state
    let editState = this.state.editItemFlag;
    // Switch flag
    editState = flagInfo;
    // Set state
    this.setState({ editItemFlag: editState });
  };

  // Edit list name
  editList = (listKey, newName) => {
    // Copy current state
    const lists = { ...this.state.lists };
    // Update with changes
    lists[listKey].title = newName;
    // Set state
    this.setState({ lists: lists });
  };

  // Edit list item info
  editListItem = (listKey, itemKey, keyToChange, newValue) => {
    // Copy current state
    const updatedLists = { ...this.state.lists };
    // Update the value in selected key
    updatedLists[listKey].items[itemKey][keyToChange] = newValue;
    // Set state
    this.setState({ lists: updatedLists });
  };

  // This method take in a list name and set state to the list name.
  // It is called from the sidebaritem.js component.
  loadSelectedList = listName => {
    // Take a copy of current user state
    let user = { ...this.state.user };

    // Check to see if any list is selected
    // Checking for initial load
    if (this.state.user.lastSelectedList === null) {
      user.lastSelectedList = listName;
    } else {
      // Store the last selected list
      // This is needed in addToViewCount().
      const lastList = this.state.user.selectedList;
      user.lastSelectedList = lastList;
    }

    // Update selected list;
    user.selectedList = listName;
    // Set state
    this.setState({
      user: user
    });

    // Add to view count
    this.addToViewCount(listName);
  };

  // Onclick method for sidebar buttons
  addToViewCount = listName => {
    // Check to see if this list is already selected
    // This is needed to prevent adding to view count of
    // a list if its already selected.

    // So only if the list is not already selected or no list is selected
    if (
      this.state.user.lastSelectedList !== this.state.user.selectedList ||
      this.state.user.lastSelectedList === null
    ) {
      // Take a copy of current selectedList state
      const lists = { ...this.state.lists };

      // Add one to view count of this list
      lists[listName].views++;

      // Set state
      this.setState({
        lists: lists
      });
    } else {
    }
  };

  // Method to set current users id in state
  setUserId = id => {
    // Copy current state
    let user = { ...this.state.user };

    // Change user id from null to passed in id
    user.uid = id;

    // Set state
    this.setState({
      user: user
    });
  };

  // Onclick method for listitem voting buttons
  itemInteraction = (eventName, itemName, listName) => {
    // Format the name, method in helper-functions.js
    const formatedItemName = formatName(itemName);

    // Take a copy of the current state
    const lists = { ...this.state.lists };

    // Flag to check if item is reported
    let reportedFlag = false;

    // Determine event and add or subtract to votes
    if (eventName === "vote-up") {
      // Add one to rank
      lists[listName].items[formatedItemName].rank += 1;
      // Add to total vote count
      lists[listName].items[formatedItemName].totalVotes++;
      // Change vote count
      this.updateVotes("decrease");
    } else if (eventName === "vote-down") {
      // Remove one from rank
      lists[listName].items[formatedItemName].rank -= 1;
      // Add to total vote count
      lists[listName].items[formatedItemName].totalVotes++;
      // Change vote count
      this.updateVotes("decrease");
    } else if (eventName === "report") {
      const item = lists[listName].items[formatedItemName];

      item.timesReported += 1;
      // Set reported flag to true
      reportedFlag = true;
      // Pass reported info to user.js to log on the current user.
      this.setState({ reportedItem: item.objKey });
    }

    // Set state to new info
    this.setState({ lists: lists });

    // Check if item was reported
    if (reportedFlag) {
      // Check report count with this method
      this.reportItem(lists[listName].items[formatedItemName]);
    }
  };

  // Utility Method to check reported list item and change state
  reportItem = listItem => {
    // The value of timesReported in a listitem
    const count = listItem.timesReported;
    // The parent object
    const listKey = listItem.parentListKey;
    // The key name of the listitem
    const listItemKey = formatName(listItem.name);

    // If count is over the limit
    if (count >= this.state.maxReportedTimes) {
      // Copy current state of lists
      const lists = { ...this.state.lists };

      // Keys in lists.listNum.items
      const numOfKeys = Object.keys(lists[listKey].items).length;

      //Check the length of items before we remove from state
      if (numOfKeys > 1) {
        // Delete the listitem
        lists[listKey].items[listItemKey] = null;
      } else {
        // Delete the list itself
        lists[listKey] = null;
      }

      // Set state to updated lists
      this.setState({ lists: lists });
    }
  };

  // Utility method to change state back to null after item was shared with user.js.
  resetReportedItem = () => {
    // Reset state back to null.
    this.setState({ reportedItem: null });
  };

  //Update current users info from user component
  updateVotes = (command, syncedVotes) => {
    // Copy current state
    const userInfo = { ...this.state.user };

    // Determine command for votes
    // Votes stored in firebase in users.
    if (command === "sync") {
      userInfo.votes = syncedVotes;
    } else if (command === "decrease") {
      userInfo.votes -= 1;
    } else if (command === "reset") {
      userInfo.votes = this.state.initialVotes;
    } else if (command === "increase") {
      userInfo.votes += 1;
    }

    // Update state
    this.setState({ user: userInfo });
  };

  //*****************************
  // Sorting and finding methods
  //*****************************

  // Method to find the list with the highest views
  // !!!!!!! Need to check the performance of this method
  findMostPopularList = () => {
    // Loop through the list

    // Array of list values
    let listsInfo = Object.values(this.state.lists);

    // Initial values
    let topView = 0; // Highest view count found
    let mostPopIndex = 0; // Index of that highest view

    listsInfo.forEach((el, idx) => {
      // Compare current element's views against the highest view count recorded
      if (el.views > topView) {
        // Since a higher value was found
        // record that index and view count
        mostPopIndex = idx;
        topView = el.views;
      }
    });

    // Get all the keys form the list
    let keys = Object.keys(this.state.lists);
    // Get the most popular list
    let mostPopList = keys[mostPopIndex];
    // Return that list
    return mostPopList;
  };

  // Method to find and update state with newest list data
  findNewestList = () => {
    // Loop through state comparing listids for the highest values
    for (let key in this.state.lists) {
      var listNumber = key;
      // Just want the first obj
      break;
    }
    // Return key of the newest list
    return listNumber;
  };

  // Remove later!!!!!!!!!!!
  loadStarterList = () => {
    this.setState({ lists: starterLists });
  };

  // React render
  render() {
    return (
      <div className="app">
        <Header
          userId={this.state.user.uid}
          userVotes={this.state.user.votes}
        />
        <Sidebar
          newestList={this.findNewestList()}
          mostPopularList={this.findMostPopularList()}
          listsCategories={this.state}
          loadSelectedList={this.loadSelectedList}
          addToViewCount={this.addToViewCount}
        />
        <ListsSection
          selectedListName={this.state.user.selectedList}
          lists={this.state.lists}
          itemInteraction={this.itemInteraction}
          editList={this.editList}
          userId={this.state.user.uid}
          flagListForEdit={this.flagListForEdit}
          flagItemForEdit={this.flagItemForEdit}
          userVoteCount={this.state.user.votes}
        />
        <User
          state={this.state}
          addList={this.addList}
          addListItem={this.addListItem}
          loadStarterList={this.loadStarterList}
          setUserId={this.setUserId}
          editListFlag={this.state.editListFlag}
          editItemFlag={this.state.editItemFlag}
          editList={this.editList}
          editListItem={this.editListItem}
          flagListForEdit={this.flagListForEdit}
          flagItemForEdit={this.flagItemForEdit}
          updateVotes={this.updateVotes}
          userVotes={this.state.user.votes}
          reportedItem={this.state.reportedItem}
          resetReportedItem={this.resetReportedItem}
        />
      </div>
    );
  }
}

export default App;
