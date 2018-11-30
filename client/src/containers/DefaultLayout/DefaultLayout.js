import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { Pie } from 'react-chartjs-2';
import 'whatwg-fetch';
import 'isomorphic-fetch';

import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';

//sidebar nav config
import navigation from '../../_nav';

//routes config
import routes from '../../routes';

import DefaultHeader from './DefaultHeader';
import DefaultFooter from './DefaultFooter';
import { callbackify } from 'util';

//<Redirect from="/" to="/dashboard" />
//^ botar isto antes do </Switch>

const paddingCard = {
    paddingBottom: '20px'
}

const pie1 = {
    labels: [
        'Red',
        'Blue',
        'Yellow',
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
        }],
};

const pie2 = {
    labels: [
        'Red',
        'Blue',
        'Yellow',
    ],
    datasets: [
        {
            data: [600, 10, 200],
            backgroundColor : [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
        }],
};

const padding = {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px'
};

var totalSales = 0;
var totalPurchases = 0;

class DefaultLayout extends Component {
    constructor (props) {
      super(props);

      this.state = {
        totalSales,
        totalPurchases
      };
    }
    fetchData(event) {
      fetch('http://localhost:5000/dashboard', {mode: 'cors'})
      .then(function(response) {
        if (response.status >= 400) {
           throw new Error("Bad response from server");
        }
        return response.json();
      })
      .catch(function(err){
        console.log('Error: ', err);
      })
      .then((json) => this.setState({
        totalSales: json.totalSales,
        totalPurchases: json.totalPurchases
      }))
    }
    componentDidMount() {
      this.fetchData();
    }
    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <DefaultHeader />
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <AppSidebarNav navConfig={navigation} {...this.props} />
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />            
                    </AppSidebar>
                    <main className="main">
                    <AppBreadcrumb appRoutes={routes} />
                    <Container fluid>
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                    <route.component {...props} />
                                )} />)
                                : (null);
                                },
                            )}    
                        
                        </Switch>
                    </Container>
                        <div style={padding} className="animated fadeIn">

                        <Row>
                            <Col xs="12" sm="6" lg="3">
                                <Card className="text-white bg-info">
                                    <CardBody className="pb-0">
                                        <div className="text-value">Total Sales</div>
                                        <div style={paddingCard}>{this.state.totalSales} €</div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" lg="3">
                                <Card className="text-white bg-primary">
                                    <CardBody className="pb-0">
                                        <div className="text-value">Total Purchases</div>
                                        <div style={paddingCard}>{this.state.totalPurchases} €</div>                                        
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" lg="3">
                                <Card className="text-white bg-warning">
                                    <CardBody className="pb-0">
                                        <div className="text-value">Gross Profit</div>
                                        <div style={paddingCard}>44.46 %</div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" lg="3">
                                <Card className="text.white bg-danger">
                                    <CardBody className="pb-0">
                                        <div className="text-value">Inventory Value</div>
                                        <div style={paddingCard}>264.000 €</div>
                                    </CardBody>        
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" sm="6">
                                <Card>
                                    <CardHeader>
                                        Pie Chart 1
                                        <div className="card-header-actions">
                                            <a href="https://www.chartjs.org" className="card-header-action">
                                                <small className="text-muted">docs</small>
                                            </a>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="chart-wrapper">
                                            <Pie data={pie1} />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs="12" sm="6">
                                <Card>
                                    <CardHeader>
                                        Pie Chart 2
                                        <div className="card-header-actions">
                                            <a href="https://www.chartjs.org" className="card-header-action">
                                                <small className="text-muted">docs</small>
                                            </a>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="chart-wrapper">
                                            <Pie data={pie2} />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        </div>
                    </main>
                </div>
                <AppFooter>
                    <DefaultFooter />
                </AppFooter>
            </div>  
        );
    }
}

export default DefaultLayout;