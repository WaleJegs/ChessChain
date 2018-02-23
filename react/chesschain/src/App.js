import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import chesschain from './chesschain';
import axios from 'axios';
import firebase from './fire';

class App extends Component {

  state = {
    master: '',
    balance: '',
    value: '',
    message: '',
    username: '',
    email: '',
    password: '',
    address: '',
    player: ''
  }

  async componentDidMount(){
    const master = await chesschain.methods.master().call();
    const balance = await web3.eth.getBalance(chesschain.options.address)
    const player = await chesschain.methods.getPlayerInfo(master, 0).call();
    const accounts = await web3.eth.getAccounts();

    this.setState({ master, balance, player, address: accounts[0] })
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    const user = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

    if (user){
      console.log('we made it')
      await firebase.database().ref('users/' + user.V.R).set({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        address: [this.state.address],
        initialValue: this.state.value
      });
    }

    await chesschain.methods.newPlayer(this.state.username).send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'Welcome to ChessChain!'})
  }

  render() {
    console.log(this.state.address)
    return (
      <div>
        <h1> ChessChain </h1>
        <p> Master: {this.state.master}</p>
        <p> Balance: {this.state.balance}</p>
        <p> Rank: {this.state.player} </p>

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
            <label> Address </label>
            <input value={this.state.address}/>
          </div>
          <div>
            <label> Username </label>
            <input
              value={this.state.username}
              onChange={event => this.setState({ username: event.target.value })}
            />
          </div>
          <div>
            <label> Email </label>
            <input
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
          <div>
            <label> Password </label>
            <input
              value={this.state.password}
              onChange={event => this.setState({ password: event.target.value })}
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
