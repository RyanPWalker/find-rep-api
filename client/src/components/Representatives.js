import React, { Component } from "react";
import "../App.css";

export default class Representatives extends Component {
  renderEmptyState = () => {
    if (this.props.reps.length === 0) {
      return (
        <p style={{ fontSize: "12px", color: "grey" }}>
          No data has been fetched. Select a state and click Submit to continue.
        </p>
      );
    }
  };

  render() {
    return (
      <section className="section2">
        <h2>
          List / <span style={{ color: "#03a7ed" }}>Representatives</span>
        </h2>

        <table className="hoverTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Party</th>
            </tr>
          </thead>
          <tbody>
            {this.props.reps.map((rep, index) => (
              <tr key={index} onClick={this.props.handleInputChange}>
                <td name="repIndex" value={index}>
                  {rep.name}
                </td>
                <td name="repIndex" value={index}>
                  {rep.party}
                </td>
              </tr>
            ))}
            {this.renderEmptyState()}
          </tbody>
        </table>
      </section>
    );
  }
}
