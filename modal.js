import React, { Component, Fragment, createRef } from "react";
import { createPortal } from "react-dom";

export default class modal extends Component {
  constructor() {
    super();
    this.state = { showModal: false };
    this.modalRef = createRef()
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target === this.modalRef.current) {
        this.toggleModal(false);
      }
    };
  }

  componentDidMount() {
    this.toggleModal(true);
  }

  toggleModal = (open) => {
    const myModal = document.getElementById("myModal");
    const display = open ? "block" : "none"
    
    document.getElementById("backdrop").style.display = display;
    myModal.style.display = display;
    open ? myModal.classList.add("show") : myModal.classList.remove("show");
  };

  logging = (e) => {
    console.log("button", e);
  }

  render() {
    return (
      createPortal(
      <Fragment>
        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          aria-labelledby="myModalLabel"
          aria-modal="true"
          role="dialog"
          ref={this.modalRef}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="myModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={this.closeModal}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.logging}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal-backdrop fade show"
          id="backdrop"
          style={{display: "none"}}
        ></div>
      </Fragment>, document.querySelector('#modal'))
    );
  }
}
