import React, { Component } from 'react';
const Chess = require('react-chess');

export default class Board extends Component {


  render() {
      const size = {
        height: '400px',
        width: '400px'
      }
        return (
            <div style={size}>
              <Chess />
            </div>
        )
    }
}
