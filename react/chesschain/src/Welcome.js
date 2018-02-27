import React, { Component } from "react";
import "./App.css"
import chesschain from "./chesschain";

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rank: "",
      gamesPlayed: ""
    };
  }

  async componentDidMount() {
    const rank = await chesschain.methods
      .getPlayerInfo(this.props.address, 0)
      .call();

    const wins = await chesschain.methods
      .getPlayerInfo(this.props.address, 2)
      .call();

    const losses = await chesschain.methods
      .getPlayerInfo(this.props.address, 3)
      .call();

    this.setState({ rank, wins, losses, gamesPlayed: +wins + +losses });
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2> Welcome {this.props.username}! </h2>
        <hr />
        <h2> Dashboard </h2>
        <div>
          <h3> Rank: {this.state.rank} </h3>
          <h3> Games Played: {this.state.gamesPlayed} </h3>
          <h3> Wins: {this.state.wins} </h3>
          <h3> Losses: {this.state.losses} </h3>
        </div>
      </div>
    );
  }
}
