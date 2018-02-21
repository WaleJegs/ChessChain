import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import chesschain from './chesschain';

class App extends Component {

  state = {
    master: '',
    balance: ''
  }

  async componentDidMount(){
    const master = await chesschain.methods.master().call();
    const balance = await web3.eth.getBalance(chesschain.options.address)

    this.setState({ master, balance })
  }

  render() {
    return (
      <div>
      <h1> ChessChain </h1>
        <p> Master: {this.state.master}</p>
        <p> Balance: {this.state.balance}</p>
      </div>
    );
  }
}

export default App;
