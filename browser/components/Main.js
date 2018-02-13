import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

const Main = (props) => {
  const { children } = props;
  return (
    <div>
      <nav>
        <h1> ChessChain </h1>
        <div><Link to="/">Home</Link></div>
      </nav>
      { children }
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.object
}

export default Main;
