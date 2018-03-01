import React, { Component } from "react";
import Board from './Board'

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inGame: 'false',
      oppenent: {
        username: '',
        rank: ''
      }
    };
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <hr />
        <h2> {this.state.oppenent.username.length || 'Waiting for an opponent'} </h2>
        <h2> {this.state.oppenent.rank.length || ""} </h2>
        <div>
          <Board />
        </div>
        <h2> {this.props.username} </h2>
        <h2> {this.props.rank} </h2>
      </div>
    );
  }
}
