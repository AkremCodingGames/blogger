import React, { Component } from 'react'
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends Component {
  
  render() {
    let {
      component: InnerComponent,
      authenticated,
      ...restOfProps
    } = this.props;
    return (
      <Route
        {...restOfProps}
        render={(props) =>
          authenticated ? <InnerComponent {...props} /> : <Redirect to="/" />
        }
      />
    )
  }
}


/* function ProtectedRoute({
  component: Component,
  authenticated,
  ...restOfProps
}) {

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default ProtectedRoute; */
