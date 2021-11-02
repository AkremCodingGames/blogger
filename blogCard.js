import React, { Component } from "react";
import { Link } from "react-router-dom";
import BlogDelete from "./blogDelete";

export default class blogCard extends Component {
  state = { showDeleteModal: false };

  truncate(text, maxLength) {
    if (text.length > maxLength) return `${text.substring(0, maxLength)}...`;
    return text;
  }

  delete = () => {
    if (this.state.showDeleteModal)
      return (
        <BlogDelete blogId={this.props.blog.id} userId={this.props.userId} cancel={() => this.setState({ showDeleteModal: true })}/>
      );
    return null;
  }

  replaceByDefaultImage = (el) => {
    el.target.src = process.env.PUBLIC_URL + "/images/blog.jpg";
  };

  manageBlog = () => {
    if (this.props.blog.userId === this.props.userId) {
      return (
        <>
          {this.delete()}
          <Link
            to={`/edit/${this.props.blog.id}`}
            className="btn btn-warning me-1 float-start"
          >
            <i className="fas fa-edit"></i>
          </Link>
          <Link
            to="/"
            className="btn btn-danger float-start"
            onClick={(this.state.showDeleteModal = false)}
          >
            <i className="far fa-trash-alt"></i>
          </Link>
        </>
      );
    }
  };

  render() {
    return (
      <div
        className="card border-success"
        style={{ width: "16rem", height: "20rem", overflow: "hidden" }}
      >
        <div
          className="card-header"
          style={{
            height: "25vh",
            maxHeight: "25vh",
          }}
        >
          <img
            src={this.props.blog.image}
            alt="cover"
            ref={this.props.addToRefs}
            onError={this.replaceByDefaultImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="card-body text-success">
          <h6 className="card-title">
            {this.truncate(this.props.blog.title, 30)}
          </h6>
          <p className="card-text">
            {this.truncate(this.props.blog.content, 50)}
          </p>
        </div>
        <div className="card-footer">
          {this.manageBlog()}
          <Link to="/" className="btn btn-primary float-end">
            Explore
          </Link>
        </div>
      </div>
    );
  }
}
