import React, { Component } from "react";
import "./App.css";
import Inputs from "./components/Inputs";

class App extends Component {
  state = {
    selectedState: "",
    reps: [],
    repIndex: null,
    isRepresentatives: "representatives",
    errorMessage: ""
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(value, name);

    this.setState({
      [name]: value,
      repIndex: null
    });
    // I did have it set to automatically fetch results when changed
    // But I left it out since the instructions ask for a button.
  };

  handleSubmit = () => {
    this.setState(
      {
        repIndex: null
      },
      () => {
        if (this.state.selectedState) this.getRepresentatives();
      }
    );
  };

  getRepresentatives = () => {
    const endpoint =
      "/" + this.state.isRepresentatives + "/" + this.state.selectedState;

    try {
      fetch(endpoint)
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            this.setState({
              reps: res.results,
              errorMessage: ""
            });
          } else {
            this.setState({ errorMessage: "Unable to fetch results." });
            console.log("Error message: ", res.error);
          }
        });
    } catch (e) {
      console.log("Something went wrong- ", e);
      this.setState({ errorMessage: "Unable to fetch results." });
    }
  };

  renderEmptyState = () => {
    if (this.state.reps.length === 0) {
      return (
        <p style={{ fontSize: "12px", color: "grey" }}>
          No data has been fetched. Select a state and click Submit to continue.
        </p>
      );
    }
  };

  renderRepresentativeInfo = () => {
    if (this.state.repIndex != null) {
      const repInfo = this.state.reps[this.state.repIndex];
      return (
        <div>
          <input
            className="input"
            placeholder="First Name"
            value={repInfo.name.split(" ")[0]}
          />
          <br />
          <input
            className="input"
            placeholder="Last Name"
            value={repInfo.name.split(" ")[1]}
          />
          <br />
          <input
            className="input"
            placeholder="District"
            value={repInfo.district}
          />
          <br />
          <input className="input" placeholder="Phone" value={repInfo.phone} />
          <br />
          <input
            className="input"
            placeholder="Office"
            value={repInfo.office}
          />
          <br />
          <input className="input" placeholder="Link" value={repInfo.link} />
        </div>
      );
    } else {
      return (
        <div>
          <input className="input" placeholder="First Name" />
          <br />
          <input className="input" placeholder="Last Name" />
          <br />
          <input className="input" placeholder="District" />
          <br />
          <input className="input" placeholder="Phone" />
          <br />
          <input className="input" placeholder="Office" />
          <br />
          <input className="input" placeholder="Link" />
        </div>
      );
    }
  };

  render() {
    return (
      <main className="App">
        <Inputs
          className="section1"
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          isRepresentatives={this.state.isRepresentatives}
          selectedState={this.state.selectedState}
        />

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
              {this.state.reps.map((rep, index) => (
                <tr
                  key={index}
                  onClick={() => this.setState({ repIndex: index })}
                >
                  <td>{rep.name}</td>
                  <td>{rep.party}</td>
                </tr>
              ))}
              {this.renderEmptyState()}
            </tbody>
          </table>
        </section>
        <section className="section3">
          <h2>Info</h2>
          {this.renderRepresentativeInfo()}
        </section>
      </main>
    );
  }
}

export default App;
