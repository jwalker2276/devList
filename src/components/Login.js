import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div className="login-wrapper">
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
      </div>
    );
  }
}

export default Login;
