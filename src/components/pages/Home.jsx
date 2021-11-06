import React from 'react';
import { connect } from 'react-redux';
import LoginHome from '../templates/LoginHome';
import LogoutHome from '../templates/LogoutHome';
import { login } from '../../store/auth';

function Home({ isLogin, login }) {
  return isLogin ? <LoginHome /> : <LogoutHome login={login} />;
}

export default connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
  }),
  {
    login,
  }
)(Home);
