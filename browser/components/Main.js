import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

const Main = (props) => {
  const { children } = props;
  return (
    <div>
      <nav>
        <div><Link to="/">Home</Link></div>
      </nav>
      { children }
    </div>
  )
}
