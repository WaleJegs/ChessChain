import React, { Component } from "react";
import "./App.css";
import Welcome from "./Welcome";
import web3 from "./web3";
import chesschain from "./chesschain";
import firebase from "./fire";
import rank from './rankInit';

class App extends Component {
  state = {
    master: "",
    balance: "",
    value: "",
    message: "",
    username: "",
    email: "",
    password: "",
    address: "",
    player: "",
    loginEmail: "",
    loginPassword: "",
    loggedIn: false,
    leaders: [],
    id: ''
  };

  async componentDidMount() {
    // const master = await chesschain.methods.master().call();
    // const balance = await web3.eth.getBalance(chesschain.options.address)
    // const player = await chesschain.methods.getPlayerInfo(master, 0).call();
    const accounts = await web3.eth.getAccounts();
    const players = await firebase.database().ref('users').orderByChild('initialValue')
    let leaders = []
    players.on('child_added', snapshot => {
      let curr = {
        username: snapshot.child('username').val(),
        initialValue: snapshot.child('initialValue').val(),
        key: leaders.length
      }
      leaders.unshift(curr)
    })

    this.setState({ address: accounts[0], leaders });

  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ message: "Waiting on transaction success..." });

    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password);

    if (user) {
      console.log("we made it");
      await firebase
        .database()
        .ref("users/" + user.V.R)
        .set({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          address: [this.state.address],
          initialValue: this.state.value,
          rank: rank(this.state.value)
        });
    }

    await chesschain.methods.newPlayer(this.state.username).send({
      from: this.state.address,
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ loggedIn: true, id: user.V.R });
  };

  onSignIn = async event => {
    event.preventDefault();

    try {
      let user = await firebase
        .auth()
        .signInWithEmailAndPassword(
          this.state.loginEmail,
          this.state.loginPassword
        );
      let info = await firebase
        .database()
        .ref(`/users/${user.V.R}`)
        .once("value");
      this.setState({
        username: info.child("username").node_.value_,
        loggedIn: true,
        id: user.V.R
      });
    } catch (e) {
      this.setState({ message: "Either your password or email is wrong. Try again..." });
    }
  };

  render() {

    return (
      <div>
        {!this.state.loggedIn ? (
          <div>
            <h1> ChessChain</h1>
            <form onSubmit={this.onSignIn}>
              <h3> Login </h3>
              <div>
                <label> Email </label>
                <input
                  value={this.state.loginEmail}
                  onChange={event =>
                    this.setState({ loginEmail: event.target.value })
                  }
                />
              </div>
              <div>
                <label> Password </label>
                <input
                  value={this.state.loginPassword}
                  type="password"
                  onChange={event =>
                    this.setState({ loginPassword: event.target.value })
                  }
                />
              </div>
              <button> Log In </button>
            </form>
            <hr />

            <form onSubmit={this.onSubmit}>
              <h3> SignUp </h3>
              <div>
                <label> Amount of Ether to Send </label>
                <input
                  value={this.state.value}
                  onChange={event =>
                    this.setState({ value: event.target.value })
                  }
                />
              </div>
              <div>
                <label> Address </label>
                <input value={this.state.address} />
              </div>
              <div>
                <label> Username </label>
                <input
                  value={this.state.username}
                  onChange={event =>
                    this.setState({ username: event.target.value })
                  }
                />
              </div>
              <div>
                <label> Email </label>
                <input
                  value={this.state.email}
                  onChange={event =>
                    this.setState({ email: event.target.value })
                  }
                />
              </div>
              <div>
                <label> Password </label>
                <input
                  value={this.state.password}
                  type="password"
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                />
              </div>
              <button>Enter</button>
            </form>
            <hr />

            <h1>{this.state.message}</h1>
          </div>
        ) : (
          <Welcome
            address={this.state.address}
            username={this.state.username}
            id={this.state.id}
          />
        )}
        <div>
          <h3> Leaderboard </h3>
          <div>
              {
                this.state.leaders.length && this.state.leaders.map((player) => {
                  return (
                    <div key={player.key}>
                      <li>
                        {player.username + " " + player.initialValue}
                      </li>
                    </div>)
                  })
              }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
