import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/GlobalStyle';
import { defaultTheme } from './assets/styles/theme';
import PlayerBar from './components/modules/PlayerBar';
import Video from './components/modules/Video';
import Home from './components/pages/Home';
import PlayList from './components/pages/PlayList';
import Search from './components/pages/Search';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/playlist/:id" component={PlayList} />
        <Route path="/search" component={Search} />
        <PlayerBar />
        <Video />
      </Router>
    </ThemeProvider>
  );
}

export default App;
