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
import { togglePlayer, readyPlayer, setPlayer } from './store/player';

function App({ isLogin, login, videoInfo, isToggle, isRender, togglePlayer, readyPlayer, isReady, player, setPlayer }) {
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
        <Route path="/playlist/:playlistId" component={PlayList} />
        <Route path="/search" component={Search} />
        {isLogin && isRender && (
          <>
            <PlayerBar videoInfo={videoInfo} togglePlayer={togglePlayer} />
            <Video
              videoInfo={videoInfo}
              isToggle={isToggle}
              readyPlayer={readyPlayer}
              isReady={isReady}
              player={player}
              setPlayer={setPlayer}
            />
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default connect(
  ({ auth, player }) => ({
    isLogin: auth.isLogin,
    player: player.player,
    videoInfo: player.videoInfo,
    isToggle: player.toggle,
    isReady: player.ready,
    isRender: player.render,
  }),
  { login, togglePlayer, readyPlayer, setPlayer }
)(App);
