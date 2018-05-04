import React from "react";

class Header extends React.Component {
  render() {
    let isLoggedIn = false;
    let hasVotes = false;

    // Check if user is logged in
    if (this.props.userId != null) {
      isLoggedIn = true;
    }

    // Check if user has votes left
    if (this.props.userVotes > 0) {
      hasVotes = true;
    }

    // Vote info templete
    const votesInfo = hasVotes ? (
      <p>Votes Left {this.props.userVotes}</p>
    ) : isLoggedIn ? (
      <p>Check back tomorrow to vote again.</p>
    ) : (
      <p />
    );

    // User info templete
    const logInOutBtn = isLoggedIn ? (
      <button className="log-in-out">Logout</button>
    ) : (
      <button className="log-in-out">Login</button>
    );

    return (
      <header className="header">
        <div className="header-left">
          <h1>Dev List</h1>
        </div>
        <div className="header-center">{votesInfo}</div>
        <div className="header-right">{logInOutBtn}</div>
      </header>
    );
  }
}

export default Header;
