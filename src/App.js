import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board size="4" />
      </div>
    );
  }
}

export default App;
