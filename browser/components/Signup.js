import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUpThunk } from '../store/index';
import history from '../history';

/**
 * COMPONENT
 */
const Signup = (props) => {
  const { name, handleSubmit, error } = props;

  return (
  <div>
  <h1> Sign Up </h1>
    <form onSubmit={handleSubmit} name={name}>
    <div>
      <label htmlFor="email"><small>Email</small></label>
      <input className="form-control" name="email" type="text" />
    </div>
    <div>
      <label htmlFor="username"><small>Username</small></label>
      <input className="form-control" name="username" type="text" />
    </div>
    <div>
      <label htmlFor="password"><small>Password</small></label>
      <input className="form-control" name="password" type="password" />
    </div>
    <div>
      <label htmlFor="address"><small>Address</small></label>
      <input className="form-control" name="address" value={window.web3.eth.accounts[0]} type="text" step="0.01" readOnly />
    </div>
    <div>
      <button type="submit">Sign Up</button>
    </div>
    {error && error.response && <div> {error.response.data} </div>}
    </form>
  </div>
  );
};

  const mapSignup = state => ({
    name: 'signup',
    displayName: 'Sign Up',
    error: state.player.error,
  });

  const mapSignUpDispatch = dispatch => ({
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const username = evt.target.username.value;
      const address = evt.target.address.value;
      dispatch(signUpThunk(email, password, username, address));
      history.push('/Welcome');
    },
  });

  Signup.propTypes = {
    name: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.object,
  };

  export default connect(mapSignup, mapSignUpDispatch)(Signup);
