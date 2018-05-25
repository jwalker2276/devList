import React from "react";

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button
          className="syntax-btn user-login-btns"
          onClick={() => this.props.authenticate("Github")}
        >
          Login with Github
        </button>
        <button
          className="syntax-btn user-login-btns"
          onClick={() => this.props.authenticate("Facebook")}
        >
          Login with Facebook
        </button>
        <button
          className="syntax-btn user-login-btns"
          onClick={() => this.props.uiCommands("closeUserPanel")}
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }
}

export default Login;
