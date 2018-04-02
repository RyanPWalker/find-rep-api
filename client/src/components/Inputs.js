import React, { Component } from "react";
import "../App.css";
import states from "../constants/states.json";

export default class Inputs extends Component {
  render() {
    return (
      <section className="section1">
        <h1 className="header">Who's My Representative?</h1>
        <hr />
        <form>
          <label>
            Representative
            <input
              name="isRepresentatives"
              value="representatives"
              type="checkbox"
              checked={this.props.isRepresentatives === "representatives"}
              onChange={this.props.handleInputChange}
            />
          </label>
          <label>
            Senator
            <input
              name="isRepresentatives"
              value="senators"
              type="checkbox"
              checked={this.props.isRepresentatives === "senators"}
              onChange={this.props.handleInputChange}
            />
          </label>
          <label>
            <select
              name="selectedState"
              onChange={this.props.handleInputChange}
            >
              <option value="select">State</option>
              {states.states.map((res, index) => (
                <option key={index} value={res}>
                  {res}
                </option>
              ))}
            </select>
          </label>
          <input
            type="Button"
            value="Submit"
            className="submitButton"
            onClick={this.props.handleSubmit}
          />
          <span style={{ color: "red" }}>{this.props.errorMessage}</span>
          <br />
        </form>
      </section>
    );
  }
}
