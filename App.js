import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./blogs/Header";
import Home from './Home'
import BlogsPage from "./blogs/blogsPage";
import TempOneBlog from "./TempOneBlog";
import BlogCreate from "./blogs/blogCreate";
import BlogEdit from "./blogs/blogEdit";
// import BlogDelete from "./blogs/blogDelete";
import history from "../history";

export default class App extends Component {
  state = { authenticated: null, userId: null };

  toggleAuth = (isSignedIn, getUserId) => {
    this.setState({
      authenticated: isSignedIn,
      userId: isSignedIn ? getUserId() : null,
    });
  };

  Routes = () => {
    if (this.state.authenticated === null) return null;
    return (
      <div className="container">
        <ProtectedRoute
          exact
          path="/create"
          component={(props) => (
            <BlogCreate userId={this.state.userId} {...props} />
          )}
          authenticated={this.state.authenticated}
        />
        {/* <ProtectedRoute
          exact
          path="/delete/:id"
          component={(props) => (
            <BlogDelete userId={this.state.userId} {...props} />
          )}
          authenticated={this.state.authenticated}
        /> */}
        <ProtectedRoute
          exact
          path="/"
          component={(props) => <Home userId={this.state.userId} {...props} />}
          authenticated={this.state.authenticated}
        />
        <ProtectedRoute
          exact
          path="/blogs/:page"
          component={(props) => (
            <BlogsPage userId={this.state.userId} {...props} />
          )}
          authenticated={this.state.authenticated}
        />
        <Route
          path="/edit/:id"
          component={(props) => (
            <BlogEdit userId={this.state.userId} {...props} />
          )}
        />
        <Route path="/blog/:id" component={TempOneBlog} />
      </div>
    );
  };

  render() {
    return (
      <Router history={history}>
        <Header
          authenticated={this.state.authenticated}
          toggleAuth={this.toggleAuth}
        />
        <br />
        <this.Routes />
      </Router>
    );
  }
}
