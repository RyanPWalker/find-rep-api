import React, { Component } from "react";
import "../App.css";

export default class Representatives extends Component {
  render() {
    return (
      <section className="section3">
        <h2>Info</h2>
        <div>
          <input
            className="input"
            placeholder="First Name"
            value={
              this.props.repIndex
                ? this.props.reps[this.props.repIndex].name.split(" ")[0]
                : ""
            }
          />
          <br />
          <input
            className="input"
            placeholder="First Name"
            value={
              this.props.repIndex
                ? this.props.reps[this.props.repIndex].name.split(" ")[1]
                : ""
            }
          />
          <br />
          <input
            className="input"
            placeholder="District"
            value={
              this.props.repIndex
                ? this.props.reps[this.props.repIndex].district
                : ""
            }
          />
          <br />
          <input
            className="input"
            placeholder="Phone"
            value={
              this.props.repIndex
                ? this.props.reps[this.props.repIndex].phone
                : ""
            }
          />
          <br />
          <input
            className="input"
            placeholder="Office"
            value={
              this.props.repIndex
                ? this.props.reps[this.props.repIndex].office
                : ""
            }
          />
          <br />
          <input
            className="input"
            placeholder="Link"
            value={
              this.props.repIndex
                ? this.props.reps[this.props.repIndex].link
                : ""
            }
          />
        </div>
      </section>
    );
  }
}
