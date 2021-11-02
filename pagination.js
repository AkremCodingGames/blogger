import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
  displayedPageNumbers = (currentPage, totalPages) => {
    const result = [currentPage];

    for (let i = 1; i <= 5; i++) {
      if (result.length >= 5) break;
      if (currentPage + i < totalPages) result.push(currentPage + i);
      if (currentPage - i > 1) result.unshift(currentPage - i);
    }

    if (result[result.length - 1] !== totalPages) result.push(totalPages);
    if (result[0] !== 1) result.unshift(1);
    return result;
  };

  render() {
    const pages = this.displayedPageNumbers(
      this.props.currentPage,
      this.props.totalPages
    );
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${
              this.props.currentPage === 1 ? "disabled" : ""
            }`}
          >
            <Link
              className="page-link"
              to={`/blogs/${this.props.currentPage - 1}`}
              onClick={() => this.props.setPage(this.props.currentPage - 1)}
              tabIndex="-1"
              aria-disabled="true"
            >
              Previous
            </Link>
          </li>
          {pages.map((pageNumber, index) => {
            return (
              <Fragment key={index}>
                <li className="page-item">
                  <Link
                    className={`page-link ${
                      pageNumber === this.props.currentPage
                        ? "text-white bg-primary"
                        : ""
                    }`}
                    to={`/blogs/${pageNumber}`}
                    onClick={() => {
                      this.props.setPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </Link>
                </li>
                {pageNumber + 1 !== pages[index + 1] &&
                pageNumber !== this.props.totalPages ? (
                  <p className="mx-2">...</p>
                ) : null}
              </Fragment>
            );
          })}
          <li
            className={`page-item ${
              this.props.currentPage === this.props.totalPages ? "disabled" : ""
            }`}
          >
            <Link
              className="page-link"
              to={`/blogs/${this.props.currentPage + 1}`}
              onClick={() => this.props.setPage(this.props.currentPage + 1)}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
