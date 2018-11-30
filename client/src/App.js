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

    this.state = {
      salesYtd: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  fetchSales() {
    fetch('http://localhost:5000/sales', 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
    })
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .catch(function(err){
        console.log(err);
    })
    .then((json) => this.populateDataset(json))
}

populateDataset(json) {
    for (let i = 0; i < json.length; i++) {
        let month = parseInt(json[i].InvoiceDate.split("-")[1]);

        this.state.salesYtd[month-1] += Math.floor(json[i].CreditAmount);
    }
}

componentWillMount() {
    this.fetchSales();
}

  render() {
    return (
        <HashRouter>
          <Switch>
            <Route exact path="/" name="Home" component={DefaultLayout} />
            <Route exact path="/sales" name="Sales" /*component={Sales}*/ render={()=><Sales salesYTD={this.state.salesYtd} />}/>
            <Route exact path="/purchases" name="Purchases" component={Purchases} />
            <Route exact path="/inventory" name="Inventory" component={Inventory} />
            <Route exact path="/finances" name="Finances" component={Finances} />

          </Switch>
        </HashRouter>
    );
  }
}

export default App;
