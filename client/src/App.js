import React, { Component } from 'react';
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
    repIndex: null,
    errorMessage: '',

  };

  handleInputChange = event => {
    const value = /*target.type === 'checkbox' ? target.checked :*/ event.target.value;
    const name = event.target.name;
    console.log("value: " + value + " name: " + name);

    this.setState({
      [name]: value
    }, () => {
      if (this.state.selectedState)
        this.getRepresentatives();
    });
  }

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
      console.log("Something went wrong- ", e)
      this.setState({ errorMessage: 'Unable to fetch results.'})
    }
  }

  renderRepresentativeInfo = () => {
    if (this.state.repIndex != null) {
      const repInfo = this.state.reps[this.state.repIndex]
      return (
        <div>
          <p>{repInfo.name}</p>
          <p>{repInfo.party}</p>
          <p>{repInfo.state}</p>
          <p>{repInfo.district}</p>
          <p>{repInfo.phone}</p>
          <p>{repInfo.office}</p>
          <p>{repInfo.link}</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="header">Who's My Representative?</h1>
        <hr/>
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
          <label>
            
            <select name="selectedState" onChange={this.handleInputChange}>
              <option value="select" >State</option>
              {this.state.states.map((res, index) =>
                <option key={index} value={res}>{res}</option>
              )}
            </select>
          </label>
          <br />
        </form>

        <h2>List / <span style={{color: "#03a7ed"}}>Representatives</span></h2>

        <table className="hoverTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Party</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reps.map((rep, index) =>
              <tr key={index} onClick={() => this.setState({repIndex: index})}><td>{rep.name}</td><td style={{float: 'right'}}>{rep.party}</td></tr>
            )}
          </tbody>
        </table>
        {this.state.errorMessage}
        {this.renderRepresentativeInfo()}
      </div>
    );
  }
}

export default App;
