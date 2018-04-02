import React, {Component} from 'react';
import App from './App';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom'
import Welcome from './Welcome';
import NewGame from './NewGame';
import history from './history';


export default class Routes extends Component {

  render(){
    return(
      <div>
      <Router history={history} >
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/welcome'component={Welcome} />
          <Route exact path='/newGame/:username' component={NewGame} />
        </Switch>
      </Router>
      </div>
    )
  }
}
