import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      rank: 0,
    }
  }

  render(){
    return (
      <div> "Test" </div>
    )
  }
}
