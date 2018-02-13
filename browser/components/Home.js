import React, { Component } from 'react';
import { Login} from './index';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      rank: 0,
    }
  }

  render(){
    return (
      <div>
        { window.web3 ? <Login /> : <div> Please Download MetaMask </div> }
      </div>
    )
  }
}
