import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

// Containers
import { DefaultLayout } from './containers';

import { 
  Sales,
  Purchases,
  Inventory,
  Finances,
} from './views';

//Pages

// import { renderRoutes } from 'react-router-config';

class App extends Component {
  constructor(props) {
    super(props);

    
  }

  render() {
    return (
        <HashRouter>
          <Switch>
            <Route exact path="/" name="Home" component={DefaultLayout} />
            <Route exact path="/sales" name="Sales" component={Sales} />
            <Route exact path="/purchases" name="Purchases" component={Purchases} />
            <Route exact path="/inventory" name="Inventory" component={Inventory} />
            <Route exact path="/finances" name="Finances" component={Finances} />

          </Switch>
        </HashRouter>
    );
  }
}

export default App;
