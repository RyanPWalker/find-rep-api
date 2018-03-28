import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    states: ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",  
    "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",  
    "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",  
    "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",  
    "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"],

    reps: [],
    selectedState: '',
    isRepresentatives: 'representatives',
    errorMessage: '',

  };

  getRepresentatives = () => {
    const endpoint = '/' + this.state.isRepresentatives + '/' + this.state.selectedState;
    console.log(endpoint);

    try {
      fetch(endpoint)
        .then(res => res.json())
        .then(reps => {
          if (reps.success === true) {
            this.setState({ 
              reps: reps.results,
              errorMessage: '' 
            })
          } else {
            this.setState({ errorMessage: 'Unable to fetch results.'})
          }
        });
    } catch (e) {
      console.log("Something went wrong- ", e);
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = /*target.type === 'checkbox' ? target.checked :*/ target.value;
    const name = target.name;
    console.log("value: " + value + " name: " + name);

    this.setState({
      [name]: value
    }, () => {
      if (this.state.selectedState)
        this.getRepresentatives();
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Who's My Representative?</h1>
        <form>
        <label>
          Representative 
          <input
            name="isRepresentatives"
            value="representatives"
            type="checkbox"
            checked={this.state.isRepresentatives === 'representatives'}
            onChange={this.handleInputChange} />
        </label>
        <label>
          Senator 
          <input
            name="isRepresentatives"
            value="senators"
            type="checkbox"
            checked={this.state.isRepresentatives === 'senators'}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          State: 
          <select name="selectedState" onChange={this.handleInputChange}>
            <option selected value="" >-Select- </option>
            {this.state.states.map((res, index) =>
              <option key={index} value={res}>{res}</option>
            )}
          </select>
        </label>
        <br />
      </form>
        {this.state.reps.map((rep, index) =>
          <div key={index}>{rep.name}, {rep.party}</div>
        )}
        {this.state.errorMessage}
        {console.log("selectedState: " + this.state.selectedState)}
      </div>
    );
  }
}

export default App;
