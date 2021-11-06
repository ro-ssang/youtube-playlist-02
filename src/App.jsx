import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/GlobalStyle';
import { defaultTheme } from './assets/styles/theme';
import Home from './components/pages/Home';
import PlayList from './components/pages/PlayList';
import Search from './components/pages/Search';
import LoggedInLayout from './components/templates/LoggedInLayout';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router>
        <LoggedInLayout>
          <Route path="/" exact component={Home} />
          <Route path="/playlist/:playlistId" component={PlayList} />
          <Route path="/search" component={Search} />
        </LoggedInLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
