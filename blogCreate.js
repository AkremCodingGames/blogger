import React, { Component } from "react";

import BlogForm from "./blogForm";
import blogs, { source } from "../../api";
import history from "../../history";

export default class BlogCreate extends Component {
  // componentWillUnmount() {
  //   source.cancel();
  //   console.log("wassup");
  // }

  onSubmit = async (formValues) => {
    await blogs
      .post(
        // new Date(createdAt).toString()
        "/blogs",
        { ...formValues, userId: this.props.userId, createdAt: Date.now() },
        // { cancelToken: source.token }
      )
      .catch((err) => console.log(err, "in post"));

    history.push("/");
  };

  render() {
    console.log(this.props)
    return <BlogForm onSubmit={this.onSubmit} />;
  }
}
