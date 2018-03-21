import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import { PasswordForgetLink } from './PasswordForget';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    const { history } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
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
    const { email, password, error } = this.state;
    const isInvalid = (password === '' || email === '');
    
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.onInputChange}
            placeholder="Email address"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.onInputChange}
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={isInvalid}
          >
            Sign In
          </button>
          { error && <p>{error.message}</p>}
        </form>
      </div>
    )
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};