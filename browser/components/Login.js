import React from 'react';
import { connect } from 'react-redux';
import { Signup } from './index';
import PropTypes from 'prop-types';
import { signInThunk } from '../store/index';

/**
 * COMPONENT
 */
const Login = (props) => {
  const { name, handleSubmit, error } = props;

  return (
  <div>
  <h3> Sign In </h3>
    <form onSubmit={handleSubmit} name={name}>
      <label htmlFor="email"><small>Email</small></label>
      <input className="form-control" name="email" type="text" />
      <label htmlFor="password"><small>Password</small></label>
      <input className="form-control" name="password" type="password" />
      <button type="submit">Login</button>
    {error && error.response && <div> {error.response.data} </div>}
    </form>
    <div>
      <Signup />
    </div>
  </div>
  );
};

  const mapLogin = state => ({
    name: 'login',
    displayName: 'Login',
    error: state.player.error,
  });

  const mapLoginDispatch = dispatch => ({
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(signInThunk(email, password));
    },
  });

  Login.propTypes = {
    name: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.object,
  };

  export default connect(mapLogin, mapLoginDispatch)(Login);
