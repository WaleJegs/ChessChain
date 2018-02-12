import React, { Component } from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Main, Home, Welcome} from './components';
import history from './history';

export default class Routes extends Component {

  render () {
    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path ="/Welcome" component={Welcome} />
          </Switch>
        </Main>
      </Router>
    )
  }
}
