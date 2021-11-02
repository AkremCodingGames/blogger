import React, { Component } from "react";

export default class BlogForm extends Component {
  state = { title: "", content: "", image: "", audience: "public" };

  componentDidMount() {
    this.setState(this.props.initialValues);
  }

  fieldChange = (e) => {
    // controlling all fields at once
    const field = e.target.id.substring(5); // removing "blog-" from the id value
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
          ? "public"
          : "private"
        : e.target.value;
    this.setState({ [field]: value });
  };

  // validate = () => {
  //   let validated = true;

  //   const inputs = [ ...document.querySelectorAll('.form-control') ]
  //   inputs.forEach(input => {
  //     console.log(input.required);
  //     if (input.value === "") {
  //     }
  //   })
  //   return false
  // }

  onSubmit = (e) => {
    e.preventDefault();

    // if(this.validate()) {
      this.props.onSubmit(this.state);
    // }
  };

  // needs-validation
  render() {
    return (
      <form>
        <div className="mb-3">
          <label htmlFor="blog-title" className="form-label">
            Title
          </label>
          <input
            className="form-control is-invalid"
            id="blog-title"
            value={this.state.title}
            onChange={this.fieldChange}
            autoComplete="off"
            aria-describedby="invalid-title"
            required
          />
          <div className="invalid-feedback invisible" id="invalid-title">
            Please enter a valid title.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="blog-image" className="form-label">
            Image <em style={{ color: "grey" }}>(optional)</em>
          </label>
          <input
            className="form-control is-invalid"
            id="blog-image"
            value={this.state.image}
            onChange={this.fieldChange}
            autoComplete="off"
            aria-describedby="invalid-image"
          />
          <div className="invalid-feedback invisible" id="invalid-image">
            Please select a valid image url.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="blog-content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control is-invalid"
            id="blog-content"
            value={this.state.content}
            onChange={this.fieldChange}
            rows="3"
            aria-describedby="invalid-content"
            required
          ></textarea>
          <div className="invalid-feedback invisible" id="invalid-content">
            Please select a valid content.
          </div>
        </div>
        <div style={{ display: "block", margin: "1rem" }}>
          <input
            className="form-check-input"
            type="checkbox"
            id="blog-audience"
            onChange={this.fieldChange}
            checked={this.state.audience === "public"}
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckChecked"
            style={{ margin: "0 1rem" }}
          >
            Public
          </label>
        </div>
        <button className="btn btn-primary" onClick={this.onSubmit}>
          Submit
        </button>
      </form>
    );
  }
}
