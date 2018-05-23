import React from "react";

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button
          className="btn-login-github"
          onClick={() => this.props.authenticate("Github")}
        >
          Login with Github
        </button>
        <button
          className="btn-login-facebook"
          onClick={() => this.props.authenticate("Facebook")}
        >
          Login with Facebook
        </button>
        <button
          className="btn-login-cancel"
          onClick={() => this.props.uiCommands("closeUserPanel")}
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }
}

export default Login;
