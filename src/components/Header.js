import React from "react";

class Header extends React.Component {
  // Header component contains:
  // Logo
  // Message Area
  // Login
  // Info Button

  // Messages
  // If not logged in "log in to add something everyone needs to know about."
  // Hide add button if not logged in

  // If logged in show the add something new button.
  // Display vote info "You can vote on # number of items".

  render() {
    let isLoggedIn = false;
    let hasVotes = false;

    // Check if user is logged in
    if (this.props.userId != null) {
      isLoggedIn = true;
    }

    // This group of buttons consist of "Login, Info".
    const buttonGroup = isLoggedIn ? (
      <div className="header-user-loggedin">
        {/* <button onClick={() => this.props.uiCommands("add")}>
          Add something new
        </button>
        <button onClick={() => this.props.uiCommands("closeUserPanel")}>
          Logout
        </button> */}
        <button onClick={() => this.props.uiCommands("info")}>Info</button>
      </div>
    ) : (
      <div className="header-user">
        <button onClick={() => this.props.uiCommands("openUserPanel")}>
          Login
        </button>
        <button onClick={() => this.props.uiCommands("info")}>Info</button>
      </div>
    );

    // Check if user has votes left
    if (this.props.userVotes > 0) {
      hasVotes = true;
    }

    // Vote info templete
    const votesInfo = hasVotes ? (
      <p>You can vote on {this.props.userVotes} items right now.</p>
    ) : isLoggedIn ? (
      <p>Check back tomorrow to vote again.</p>
    ) : (
      <p>Log in to add something everyone needs to know about.</p>
    );

    return (
      <header className="header-section">
        <img className="header-logo" src="../images/code.svg" alt="logo" />
        <div className="header-messages">{votesInfo}</div>
        {buttonGroup}
      </header>
    );
  }
}

export default Header;
