import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUpThunk } from '../store/index';

/**
 * COMPONENT
 */
const Signup = (props) => {
  const { name, handleSubmit, error } = props;

  return (
    <div>
    <h1> Sign Up </h1>
      <form onSubmit={handleSubmit} name={name}>
        <label htmlFor="email"><small>Email</small></label>
        <input className="form-control" name="email" type="text" />
        <label htmlFor="username"><small>Username</small></label>
        <input className="form-control" name="username" type="text" />
        <label htmlFor="password"><small>Password</small></label>
        <input className="form-control" name="password" type="password" />
        <button type="submit">Log in</button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

        /**
         * CONTAINER
         *   Note that we have two different sets of 'mapStateToProps' functions -
         *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
         *   function, and share the same Component. This is a good example of how we
         *   can stay DRY with interfaces that are very similar to each other!
         */

        const mapSignup = state => ({
            name: 'signup',
            displayName: 'Sign Up',
            error: state.player.error,
        });

        const mapSignInDispatch = dispatch => ({
            handleSubmit(evt) {
                evt.preventDefault();
                const email = evt.target.email.value;
                const password = evt.target.password.value;
                const username = evt.target.username.value;
                dispatch(signUpThunk(email, password, username));
            },
        });

        Signup.propTypes = {
            name: PropTypes.string.isRequired,
            handleSubmit: PropTypes.func.isRequired,
            error: PropTypes.object,
        };


        export default connect(mapSignup, mapSignInDispatch)(Signup);
