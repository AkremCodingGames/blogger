import React, { Component } from "react";

import Authentication from "../Authentication";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-info">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            Blogger
          </a>
          <Authentication
            toggleAuth={this.props.toggleAuth}
            authenticated={this.props.authenticated}
          />
        </div>
      </nav>
    );
  }
}
