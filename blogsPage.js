import React, { Component, createRef, Fragment } from "react";
import axios from "axios";

import blogs from "../../api";
import BlogCard from "./blogCard";
import Pagination from "../pagination";
import history from "../../history";

export default class blogsPage extends Component {
  state = { page: null }; // to make it update after fetching data without additional state

  async componentDidMount() {
    this.data = null;
    await this.fetchData();

    this.images = createRef();
    this.images.current = [];

    // to prevent NaN, 0 & out of bounds values
    let currentPage = Math.min(
      Math.max(parseInt(this.props.match.params.page) || 1, 1),
      this.data.length
    );
    history.push(`/blogs/${currentPage}`);
    this.setState({ page: currentPage });
  }

  async fetchData() {
    const request1 = blogs.get("/blogs", {
      params: {
        audience: "public",
      },
    });
    const request2 = blogs.get("/blogs", {
      params: {
        audience: "private",
        userId: this.props.userId,
      },
    });

    const responses = await axios.all([request1, request2]);

    this.data = [...responses[0].data, ...responses[1].data];
    this.data.sort((x, y) => (x.createdAt < y.createdAt ? 1 : -1));
    this.data = this.paginate(this.data)
  }

  paginate = (data) => {
    return data.reduce((accumulator, current, index) => {
      if (Number.isInteger(index / 10))
        return [...accumulator, [current]];
      accumulator[accumulator.length - 1].push(current);
      return accumulator;
    }, []);
  };

  addToRefs = (el) => {
    if (el && !this.images.current.includes(el)) this.images.current.push(el);
  };

  changePage = page => {
    this.setState({ page })
  }

  render() {
    if (!this.data || !this.state.page) return null;
    return (
      <Fragment>
        <div className="row row-cols-auto g-2 mb-5">
          {this.data[this.state.page - 1].map((blog) => {
            return (
              <div className="col" key={blog.id}>
                <BlogCard blog={blog} addToRefs={this.addToRefs} userId={this.props.userId} />
              </div>
            );
          })}
        </div>
        <Pagination
          currentPage={this.state.page}
          setPage={this.changePage}
          totalPages={this.data.length}
        />
      </Fragment>
    );
  }
}
