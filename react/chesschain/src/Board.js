// import React, { Component } from 'react';
// const Chess = require('react-chess');
// const Game = require('chess');

// export default class Board extends Component {

//   constructor(props){
//     super(props)

//     this.state = {
//       client: {},
//       start: true
//     }

//   }

//   componentDidMount(){
//     const client = Game.create({ PGN: true });
//     this.setState({ client })
//   }

//   render() {
//     let m = null;
//     // let status = this.state.client.getStatus();
//     const size = {
//       height: '400px',
//       width: '400px'
//     }
//     return (
//       <div style={size}>
//         <Chess
//           allowMoves={this.state.start}
//           drawLabels={false}
//         />
//       </div>
//     )
//   }
// }
import React, { Component } from 'react';
const Chess = require('react-chess');

require('./Board.css')

export default class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {pieces: Chess.getDefaultLineup()}
    this.handleMovePiece = this.handleMovePiece.bind(this)
  }

  handleMovePiece(piece, fromSquare, toSquare) {
    const newPieces = this.state.pieces
      .map((curr, index) => {
        if (piece.index === index) {
          return `${piece.name}@${toSquare}`
        } else if (curr.indexOf(toSquare) === 2) {
          return false // To be removed from the board
        }
        return curr
      })
      .filter(Boolean)

    this.setState({pieces: newPieces})
  }

  render() {
    const {pieces} = this.state
    return (
      <div className="demo">
        <Chess pieces={pieces} onMovePiece={this.handleMovePiece} />
      </div>
    )
  }
}
