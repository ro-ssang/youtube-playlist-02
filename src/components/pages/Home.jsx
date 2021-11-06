import React from 'react';
import { connect } from 'react-redux';
import LoginHome from '../templates/LoginHome';
import LogoutHome from '../templates/LogoutHome';

function Home({ isLogin }) {
  return <>{isLogin ? <LoginHome /> : <LogoutHome />}</>;
}

export default connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
  }),
  {}
)(Home);
