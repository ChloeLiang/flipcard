import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from './components/navBar';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
      </React.Fragment>
    );
  }
}

export default App;
