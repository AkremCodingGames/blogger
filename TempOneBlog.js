import React, { Component } from "react";

export default class TempOneBlog extends Component {

  render() {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://i.kym-cdn.com/entries/icons/original/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg"
          className="card-img-top"
          alt="stonks"
        />
        <div className="card-body">
          <h5 className="card-title">Learning Curve</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            dignissimos quidem! Soluta, quas? Amet, cupiditate.
          </p>
          <a href="/" className="btn btn-primary">
            Explore
          </a>
        </div>
      </div>
    );
  }
}
