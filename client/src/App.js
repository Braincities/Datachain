import React, { Component } from 'react'
import Web3 from 'web3'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isConnected: false }
    this.Web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    )
  }

  componentWillMount() {
    if (this.web3 && this.web3.isConnected()) {
      this.setState({isConnected: true})
    }
  }

  render() {
    return (
      <div>
        <h2>Is connected?:</h2>
        <br />
        {this.state.isConnected ? 'Connected to local node' : 'Not connected'}
      </div>
    )
  }
}

export default App
