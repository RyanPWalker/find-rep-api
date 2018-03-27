import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {reps: []}

  componentDidMount() {
    fetch('/representatives/CA')
      .then(res => res.json())
      .then(reps => this.setState({ reps: reps.results }));
  }

  render() {
    return (
      <div className="App">
        <h1>Reps</h1>
        {this.state.reps.map((rep, index) =>
          <div key={index}>{rep.name}</div>
        )}
      </div>
    );
  }
}

export default App;
