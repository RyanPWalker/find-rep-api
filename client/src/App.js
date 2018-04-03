import React, { Component } from "react";
import "./App.css";
import Inputs from "./components/Inputs";
import Representatives from "./components/Representatives";
import RepInfo from "./components/RepInfo";

class App extends Component {
  state = {
    selectedState: "",
    reps: [],
    repIndex: null,
    isRepresentatives: "representatives",
    errorMessage: ""
  };

  handleInputChange = event => {
    const value = event.target.value || event.target.getAttribute("value");
    const name = event.target.name || event.target.getAttribute("name");

    this.setState({
      [name]: value
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
          errorMessage={this.state.errorMessage}
        />

        <Representatives
          className="section2"
          handleInputChange={this.handleInputChange}
          reps={this.state.reps}
        />

        <RepInfo
          className="section2"
          reps={this.state.reps}
          repIndex={this.state.repIndex}
        />
      </main>
    );
  }
}

export default App;
