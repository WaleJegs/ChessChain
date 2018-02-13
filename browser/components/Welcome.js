import React from 'react';
import { connect } from 'react-redux';

const Welcome = (props) => {
  console.log(props)
  return (
    <div>
      { `Welcome ${props.state.username}!` }
    </div>
  )};

const mapStateToProps = (state) => {
  return {
    state: state.player
  }
}

export default connect(mapStateToProps)(Welcome)
