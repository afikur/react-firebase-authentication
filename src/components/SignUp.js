import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';
import { auth } from '../firebase';


const SignUpPage = ({ history }) =>
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  
  onSubmit = (event) => {
    const { email, passwordOne } = this.state;
    const { history } = this.props;
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });
    event.preventDefault();
  }

  onInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    this.setState({
      [field]: value
    });
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          name='username'
          onChange={this.onInputChange}
          placeholder='Username'
          type="text"
        />

        <input
          type="text"
          value={email}
          name='email'
          onChange={this.onInputChange}
          placeholder='Email Address'
        />

        <input
          type="password"
          value={passwordOne}
          name='passwordOne'
          onChange={this.onInputChange}
          placeholder='Password'
        />

        <input
          type="password"
          value={passwordTwo}
          name='passwordTwo'
          onChange={this.onInputChange}
          placeholder='Confirm password'
        />

        <button 
          type="submit"
          disabled={isInvalid}
        >
          Sign Up
        </button>

        { error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
