import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import chesschain from './chesschain';

class App extends Component {

  state = {
    master: '',
    balance: '',
    value: '',
    message: '',
    username: ''
  }

  async componentDidMount(){
    const master = await chesschain.methods.master().call();
    const balance = await web3.eth.getBalance(chesschain.options.address)

    this.setState({ master, balance })
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    await chesschain.methods.newPlayer(this.state.username).send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'Welcome to ChessChain!'})
  }

  render() {
    console.log(this.state.username, this.state.value)
    return (
      <div>
        <h1> ChessChain </h1>
        <p> Master: {this.state.master}</p>
        <p> Balance: {this.state.balance}</p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h3> ChessChain SignUp </h3>
          <div>
            <label> Amount of Ether to Send </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <div>
            <label> Username </label>
            <input
              value={this.state.username}
              onChange={event => this.setState({ username: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
