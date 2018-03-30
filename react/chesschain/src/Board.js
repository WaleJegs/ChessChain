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
const Game = require('chess');
require('./Board.css')

export default class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pieces: Chess.getDefaultLineup(),
      color: "white",
      whitePieces: new Set(),
      blackPieces: new Set(),
      turn: true,
      set: false
    }
    this.handleMovePiece = this.handleMovePiece.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
  }

  componentDidMount(){
    if (this.state.set === false){
        let black = new Set()
        let white = new Set()
        this.state.pieces.forEach(piece => {
          if (piece[3] === '1' || piece[3] === '2'){
            white.add(piece);
          } else {
            black.add(piece);
          }
        })
        this.setState({ whitePieces: white, blackPieces: black, set: true })
    }
  }


  handleMovePiece(piece, fromSquare, toSquare) {
    let white = this.state.whitePieces;
    let black = this.state.blackPieces;
    const newPieces = this.state.pieces
      .map((curr, index) => {
        if (piece.index === index) {
          if (white.has(`${piece.name}@${fromSquare}`)){
            white.delete(`${piece.name}@${fromSquare}`)
            white.add(`${piece.name}@${toSquare}`)
          } else if (black.has(`${piece.name}@${fromSquare}`)){
            black.delete(`${piece.name}@${fromSquare}`)
            black.add(`${piece.name}@${toSquare}`)
          }
          return `${piece.name}@${toSquare}`
        } else if (curr.indexOf(toSquare) === 2) {
          if (white.has(curr)) white.delete(curr)
          if (black.has(curr)) black.delete(curr)
          return false // To be removed from the board
        }
        return curr
      })
      .filter(Boolean)
    this.setState({pieces: newPieces, blackPieces: black, whitePieces: white, turn: !this.state.turn})
  }

  handleDragStart(piece, fromSquare){
    if (this.state.turn){
      if (this.state.blackPieces.has(`${piece.name}@${fromSquare}`)) return false;
    } else{
      if (this.state.whitePieces.has(`${piece.name}@${fromSquare}`)) return false;
    }
    return true;
  }

  render() {
    const {pieces, whitePieces, blackPieces} = this.state

    console.log(whitePieces, blackPieces)
    return (
      <div className="demo">
        <Chess pieces={pieces} onMovePiece={this.handleMovePiece} onDragStart={this.handleDragStart} />
      </div>
    )
  }
}
