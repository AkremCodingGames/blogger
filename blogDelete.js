// import ReactDOM from "react-dom";
import { Component } from "react";

import blogs from "../../api";
import history from "../../history";
import Modal from "../modal";

export default class BlogDelete extends Component {
  componentDidMount() {
    (async () => {
      // const { id } = this.props.match.params;
      const response = await blogs.get(`/blogs/${this.props.blogId}`);
      console.log(response.data.userId, this.props.userId);
      if (response.data.userId !== this.props.userId) {
        history.push("/");
        return;
      }
    })();
  }

  onSubmit = () => {};

  render() {
    // return ReactDOM.createPortal(<Modal />, document.querySelector("#modal"));
    return <Modal cancel={() => this.setState({ showDeleteModal: true })}/>;
  }
}
