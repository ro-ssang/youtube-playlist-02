import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/GlobalStyle';
import { defaultTheme } from './assets/styles/theme';
import PlayerBar from './components/modules/PlayerBar';
import Video from './components/modules/Video';
import Home from './components/pages/Home';
import PlayList from './components/pages/PlayList';
import Search from './components/pages/Search';
import { LS_TOKEN } from './contants';
import { login } from './store/auth';

function App({ isLogin, login }) {
  useEffect(() => {
    if (localStorage.getItem(LS_TOKEN)) {
      login();
    }
  }, [login]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/playlist/:videoId" component={PlayList} />
        <Route path="/search" component={Search} />
        {isLogin && (
          <>
            <PlayerBar />
            <Video />
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
  }),
  { login }
)(App);
