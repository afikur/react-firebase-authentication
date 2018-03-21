import React from 'react';
import { PasswordForgetForm } from './PasswordForget';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = ({ authUser }) =>
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

  
const authCondition = (authUser) => !!authUser;
const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);