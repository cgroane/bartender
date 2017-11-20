import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import router from '../../router';
import Nav from './../Nav/Nav';

class App extends Component {

  componentDidMount() {
    // axios.get('/api/test').then(response => console.log(response));
  }

  render() {
    return (
      <div className="App">
      <Nav/>
        <div className="component_Container" >
        {router}
      </div>
      </div>
    );
  }
}

export default App;
