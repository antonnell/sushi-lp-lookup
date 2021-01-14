import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Switch,
  Route
} from "react-router-dom";
import IpfsRouter from 'ipfs-react-router'

import interestTheme from './theme';

import Header from './components/header';
import Home from './components/home';

import Store from "./stores";
const emitter = Store.emitter
const store = Store.store
const dispatcher = Store.dispatcher

class App extends Component {
  state = {};

  render() {
    return (
      <MuiThemeProvider theme={ createMuiTheme(interestTheme) }>
        <CssBaseline />
        <IpfsRouter>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            background: "#fff8ee"
          }}>
            <Switch>
              <Route path="/">
                <Header />
                <Home />
              </Route>
            </Switch>
          </div>
        </IpfsRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
