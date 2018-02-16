import React, { Component } from 'react';
import { Login} from './index';
import Signup from './Signup';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import web3 from '../web3'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      rank: 0,
    }
  }

  render(){
    console.log(web3.currentProvider)
    return (
      <div>
        { window.web3 ?
        <div>
          <Signup />
          <Login />
        </div>
        : <div> Please Download MetaMask </div> }
      </div>
    )
  }
}
