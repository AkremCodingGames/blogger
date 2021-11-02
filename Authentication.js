import React, { Component } from "react";
// import history from "../history";

export default class Authentication extends Component {
  toggleLogging = () => {
    if (this.props.authenticated === null) {
      return;
    }

    if (this.props.authenticated) {
      this.auth.signOut();
      // history.push('/'); // we will see if its needed to push
    } else this.auth.signIn();
  };

  componentWillUnmount() {
    if(this.listener)
      this.listener.remove();
  }

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "438652987553-ei1cmfk3lfsh17bgasiq8evh7hqosoo7.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // getId() need to be inside a cb function so it will only be executed when needed to
          const getUserId = () => this.auth.currentUser.get().getId();
          this.props.toggleAuth(this.auth.isSignedIn.get(), getUserId);
          this.listener =  this.auth.isSignedIn.listen((isSignedIn) => {
            this.props.toggleAuth(isSignedIn, getUserId);
          });
        });
    });
  }

  render() {
    [this.color, this.text] =
      this.props.authenticated === null
        ? ["secondary", "loading"]
        : this.props.authenticated === true
        ? ["light", "Logout"]
        : ["success", "Connect"];
    return (
      <button className={`btn btn-${this.color}`} onClick={this.toggleLogging}>
        {this.text}
      </button>
    );
  }
}
