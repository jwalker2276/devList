import React from "react";

class Login extends React.Component {
  render() {
    return (
      <section className="user-section">
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
      </section>
    );
  }
}

export default Login;
