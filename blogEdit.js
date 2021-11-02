import React, { Component } from "react";
import _ from "lodash";

import BlogForm from "./blogForm";
import blogs, { source } from "../../api";
import history from "../../history";

export default class BlogEdit extends Component {
  state = {};

  // componentWillUnmount() {
  //   if(source)
  //     source.cancel();
  // }

  componentDidMount() {
    console.log("mounting id", this.props.match.params.id);
    let response = null;
    (async () => {
      try {
        response = await blogs
        .get("/blogs", {
          params: {
            id: this.props.match.params.id,
          },
          // cancelToken: source.token,
        });
      } catch (err) {
        console.log(err)
      }
      if (
        response.data.length === 0 ||
        this.props.userId !== response.data[0].userId
      ) {
        history.push("/");
        return;
      }
      console.log("response:", response.data[0]);
      this.setState({
        initialValues: _.pick(response.data[0], "title", "content", "image", "audience"),
      });
      console.log("mounting done", this.state)
    })();
  }

  onSubmit = async (formValues) => {
    await blogs.patch(`/blogs/${this.props.match.params.id}`, formValues); // , { cancelToken: source.token }
    history.push("/");
  };

  render() {
    console.log("state", this.state)
    if (!this.state.initialValues) return null;
    return (
      <BlogForm
        onSubmit={this.onSubmit}
        initialValues={this.state.initialValues}
      />
    );
  }
}
