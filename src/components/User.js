import React from "react";
import Login from "./Login";
import Addlist from "./Addlist";
import Addlistitem from "./Addlistitem";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import Editlist from "./Editlist";
import EditItem from "./EditItem";

class User extends React.Component {
  state = {
    owner: null,
    users: {},
    currentUserKey: null,
    userStatus: "loggedOut"
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

  // Lets check for changes
  componentDidUpdate() {
    // Prop from app.js
    const appVoteCount = this.props.userVotes;

    // Make sure the user is logged in with a valid key
    if (this.state.currentUserKey !== null) {
      // User.js local state and db data
      const userVoteCount = this.state.users[this.state.currentUserKey]
        .votesLeft;

      // Is the data between app.js and user.js in sync?
      // Is prop userVotes different from whats stored in db and user state?
      if (appVoteCount !== userVoteCount) {
        // Check if the user voted
        // -1 is the intital value on page load
        if (appVoteCount !== -1) {
          // Ok user just voted
          // Lets find which index to change
          // Then lets change it
          this.logVoteTimeInDatabase();
        }

        // Update the db
        this.updateVotesInDatabase();
      }
    }

    // user clicks logout button in header

    // if the userpanel is closed and the userStatus is loggedIn
    // logout

    //Need to check the user panel status as prop
    // Pass the status of the panel, opened or closed to user
    //

    // Stopped here

    // Lets check for a reported Item
    // Watching reportedItem prop from app.js
    // If no item is reported the value will be null
    if (this.props.reportedItem !== null) {
      // Log this item in current user reported array
      this.addItemToReported(this.props.reportedItem);
    }
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
      // New user object
      storedUsers[newUserKey] = {
        id: userId,
        voteTimes: [0, 0, 0],
        voteTimeIndexToChange: 0,
        votesLeft: 3,
        uKey: newUserKey,
        reportedItems: [-1]
      };
    }

    // Set state
    this.setState({ users: storedUsers });

    // Set current user key in state
    this.setCurrentUserKey(userKey);

    // Update app's local state with votesCount from database.
    this.syncVotesToApp(userKey);

    // Change state to loggedIn
    this.setState({ userStatus: "loggedIn" });
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

    // Change state to loggedOut
    this.setState({
      userStatus: "loggedOut"
    });

    // Close the user panel
    this.props.uiCommands("closeUserPanel");
  };

  //*****************************
  // User methods
  //*****************************

  // Set currentUserKey
  // This method is call when logging in and out
  // This method updates the current userkey value for use
  // in other methods.
  setCurrentUserKey = userKey => {
    // Copy current value in state
    let currentUser = this.state.currentUserKey;

    // Update with current user key
    currentUser = userKey;

    // Update state
    this.setState({ currentUserKey: currentUser });
  };

  // Sync votes
  // This method updates the users votesCount from the datebase to app's state.
  syncVotesToApp = userId => {
    // First check on vote count
    this.determineVotesForUser(userId);

    // Get votes stored in users.state and sync with app.js
    this.props.updateVotes("sync", this.state.users[userId].votesLeft);
  };

  // The method check the users voteTimesArray and determines
  // whether a required time has passed for new votes to be givin out.
  // Method is call from synVotesToApp
  determineVotesForUser = userId => {
    // Array of times when user last voted.
    const userVoteTimesArr = this.state.users[userId].voteTimes;

    // Looping through times array
    userVoteTimesArr.forEach((loggedTime, idx) => {
      // Current time in seconds
      const currentTime = Math.floor(Date.now() / 1000);
      // Min time required
      const minTimeRequired = 86400; // 24 hours in seconds;
      // Check if the user has even voted yet.
      // The loggedTime will store a 0 when user hasn't used vote.
      if (loggedTime !== 0) {
        const difference = currentTime - loggedTime;
        console.log(currentTime + " - " + loggedTime + " = " + difference);
        // If time limit has been met
        if (difference > minTimeRequired) {
          this.addVotes(idx, userId);
        }
      }
    });
  };

  // The method is a helper method for determineVotesForUser.
  // It updates this.state users.
  // It changes voteTimes and votesLeft
  addVotes = (index, userId) => {
    // First copy users state
    const users = { ...this.state.users };

    // Update the voteTimes array with a 0
    users[userId].voteTimes[index] = 0;
    // Update the votesLeft value with a new vote
    users[userId].votesLeft += 1;

    // Merge state
    this.setState({ users: users });

    // Update the change index too
    this.changeTimeIndex();
  };

  // Update votes in datebase
  // This method takes userVotes prop from app
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

  // Log the time of vote
  logVoteTimeInDatabase = () => {
    // Current user
    const currentUserKey = this.state.currentUserKey;

    // Determine which time to change
    const timeIndexToChange = this.state.users[currentUserKey]
      .voteTimeIndexToChange;

    // Copy users state
    const users = { ...this.state.users };

    // Update voteTimes index with new time in seconds
    users[currentUserKey].voteTimes[timeIndexToChange] = Math.floor(
      Date.now() / 1000
    );

    // Set state
    this.setState({ users: users });

    // Now let move to the next index for next time.
    this.changeTimeIndex();
  };

  // This method is called after logging a time in the current index.
  // It will update state with next index to change when the user votes again.
  changeTimeIndex = () => {
    // The index I track of the current user.
    let index = this.state.users[this.state.currentUserKey]
      .voteTimeIndexToChange;
    const timesArrayLength = this.state.users[this.state.currentUserKey]
      .voteTimes.length;

    // Copy current state
    const users = { ...this.state.users };

    // Change the index in the current users object.

    // If index is not at the end of the array, array.length -1, add 1 to the index
    if (index !== timesArrayLength - 1) {
      // Up the value by 1.
      users[this.state.currentUserKey].voteTimeIndexToChange += 1;
    } else {
      // Set the index to the start of the array.
      users[this.state.currentUserKey].voteTimeIndexToChange = 0;
    }

    // No update state
    this.setState({ users: users });
  };

  // This method is called from within componentDidUpdate
  // This method logs the passed item and adds it to the user's reportedItems array.
  addItemToReported = item => {
    // Adding to array
    console.log("logging " + item);

    // Done logging the item, now reset it back in app.js
    this.props.resetReportedItem();
  };

  render() {
    // Log out button
    const logout = <button onClick={this.logout}>Log Out</button>;

    // Check to see if the user is logged in
    if (!this.state.owner) {
      return (
        <section className="user-section">
          <Login authenticate={this.authenticate} />
        </section>
      );
    }

    // Check to see if the user wants to edit a list
    if (this.props.editListFlag) {
      return (
        <section className="user-section">
          <Editlist
            selectedList={this.props.state.user.selectedList}
            lists={this.props.state.lists}
            editList={this.props.editList}
            flagListForEdit={this.props.flagListForEdit}
          />
        </section>
      );
      // Check to see if the user wants to edit a listitem
    } else if (this.props.editItemFlag != null) {
      // Get key for editItem
      const itemKey = this.props.editItemFlag;
      return (
        <section className="user-section">
          <EditItem
            selectedList={this.props.state.user.selectedList}
            lists={this.props.state.lists}
            editListItem={this.props.editListItem}
            flagItemForEdit={this.props.flagItemForEdit}
            itemKey={itemKey}
          />
        </section>
      );
    }

    // If logged in show features
    return (
      <section className="user-section">
        <div className="user-tab-wrapper">
          <div className="user-title-tab">
            <h3 className="user-title">User Setting.js</h3>
          </div>
        </div>
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
