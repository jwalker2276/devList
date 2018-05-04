import React from "react";
import Login from "./Login";
import Addlist from "./Addlist";
import Addlistitem from "./Addlistitem";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import Editlist from "./Editlist";
import EditItem from "./EditItem";

// This component houses user interaction elements.

class User extends React.Component {
  state = {
    owner: null,
    users: {},
    currentUserKey: null
  };

  //********************
  // Lifecycle methods
  //********************

  // Check for page load
  componentDidMount() {
    // Sync firebase
    this.ref = base.syncState("users", {
      context: this,
      state: "users"
    });
  }

  // Check for change
  componentDidUpdate() {
    // Something changed, check if user voted.
    this.updateVotesInDatabase();
  }

  // Called when unmounted
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  //*****************************
  // Authentication
  //*****************************

  // Authenticate with firebase
  // Provider is either facebook or github
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  // Method to set the owner info in this.state
  authHandler = authData => {
    // Set the owner key in state
    this.setState({
      owner: authData.user.uid
    });

    // Also update state in app for list and listitems components
    this.props.setUserId(authData.user.uid);

    // Add the user
    this.logInUser(authData.user.uid);
  };

  // Method to add new users and check for existing
  logInUser = userId => {
    // Get current stored users
    const storedUsers = this.state.users;
    // Check if userId already exist
    let isCurrentUser = false;
    // Array of current users ids
    const currentUsersArr = Object.keys(storedUsers).map(
      key => storedUsers[key].id
    );
    // Array of all keys
    const usersKeys = Object.keys(storedUsers);

    // User key to update then passed to syncVotes().
    let userKey = undefined;

    // Check each id against the current userId
    currentUsersArr.forEach((el, index) => {
      if (el === userId) {
        isCurrentUser = true;
        // Update userKey to pass to syncVotes
        userKey = usersKeys[index];
      }
    });

    // If this is a new user
    if (!isCurrentUser) {
      // Add the new user
      const newUserKey = Date.now();
      // New user, update key for syncVotes
      userKey = newUserKey;
      // New user object to store
      storedUsers[newUserKey] = {
        id: userId,
        voteTimes: [0, 0, 0],
        votesLeft: 3,
        uKey: newUserKey
      };
    }

    // Set state
    this.setState({ users: storedUsers });

    // Call sync votes
    this.syncVotesToApp(userKey);

    // Set current user key in state
    this.setCurrentUserKey(userKey);
  };

  // Check votes count
  determineVotesForUser = userId => {
    // 1. Check voteTimes array for times greater then 24 hours in milliseconds

    // Array of times when user last voted.
    const userVoteTimesArr = this.state.users[userId].voteTimes;

    // Looping through times array
    userVoteTimesArr.forEach((ele, idx) => {
      // Current time
      const currentTime = Date.now();
      // Min time required
      const minTimeRequired = 0;
      //
      if (ele !== 0) {
        console.log("checking if greater than 24 hours");
      } else {
        console.log("hasn't voted yet");
      }
    });

    // 2. Update votesLeft for current user
  };

  // Sync votes
  syncVotesToApp = userId => {
    // First check on vote vote count
    this.determineVotesForUser(userId);

    // Get votes stored in users.state and sync with app.js
    this.props.updateVotes("sync", this.state.users[userId].votesLeft);
  };

  // Set currentUserKey
  setCurrentUserKey = userKey => {
    // Copy current value in state
    let currentUser = this.state.currentUserKey;

    // Update with current user key
    currentUser = userKey;

    // Update state
    this.setState({ currentUserKey: currentUser });
  };

  // Update votes in datebase
  updateVotesInDatabase = () => {
    // Make sure votes does not equal -1.
    const { userVotes } = this.props;

    // Sync only valid data
    // If logged in user votes will never be less then 0
    // currentUserKey is null only when logged out
    if (userVotes > -1 && this.state.currentUserKey != null) {
      // Copy current users state
      let users = { ...this.state.users };

      // Update users data
      users[this.state.currentUserKey].votesLeft = userVotes;

      // Set state
      this.setState({ users: users });
    }
  };

  // Method to logout the user
  logout = () => {
    // Set the owner key back to null
    this.setState({
      owner: null
    });

    // Update currentUserKey to null
    this.setCurrentUserKey(null);

    // Update state in app
    this.props.setUserId(null);
  };

  render() {
    // Log out button
    const logout = <button onClick={this.logout}>Log Out</button>;

    // Check to see if the user is logged in
    if (!this.state.owner) {
      return <Login authenticate={this.authenticate} />;
    }

    // Check to see if the user wants to edit a list
    if (this.props.editListFlag) {
      return (
        <Editlist
          selectedList={this.props.state.user.selectedList}
          lists={this.props.state.lists}
          editList={this.props.editList}
          flagListForEdit={this.props.flagListForEdit}
        />
      );
    }

    // Check to see if the user wants to edit a listitem
    if (this.props.editItemFlag != null) {
      // Get key for editItem
      const itemKey = this.props.editItemFlag;
      console.log("edititemflag is " + itemKey);
      return (
        <EditItem
          selectedList={this.props.state.user.selectedList}
          lists={this.props.state.lists}
          editListItem={this.props.editListItem}
          flagItemForEdit={this.props.flagItemForEdit}
          itemKey={itemKey}
        />
      );
    }

    // If logged in show features
    return (
      <section className="user">
        {logout}
        <Addlist addList={this.props.addList} userId={this.state.owner} />
        <Addlistitem
          state={this.props.state}
          addListItem={this.props.addListItem}
          userId={this.state.owner}
        />
        <button onClick={this.props.loadStarterList}>Load Starter List</button>
      </section>
    );
  }
}

export default User;
