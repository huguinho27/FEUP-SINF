import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardHeader, Table, Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import { Pie } from 'react-chartjs-2';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
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
import { runInThisContext } from 'vm';

//<Redirect from="/" to="/dashboard" />
//^ botar isto antes do </Switch>

const paddingCard = {
    paddingBottom: '20px'
}

const darkblue = '#000066';
const blue = '#3366ff';
const lightpurple = '#9933ff';
const bluedgreen = '#009999';
const grey = '#666699';
const padding = {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px'
};


const topPadding = {
    paddingTop: '7px',
}

const rowPadding = {
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

let exportButtonTopPadding = {
    paddingTop: '2px',
}

class DefaultLayout extends Component {
    constructor (props) {
      super(props);

      this.state = {
        totalSales: 0,
        totalPurchases: 0,
        topCustomersCompany : [0,0,0,0,0],
        topCustomersTotal: [0,0,0,0,0],
        topSuppliersName: [],
        topSuppliersWebsite: [],
        topSuppliersAddress: [],
        inventoryValue: 0,
        grossprofit: 0,
        years: ['2019'],
        months: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        months2: [
          "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        defaultYear: '2019',
        defaultMonth: 'January',
        defaultMonth2: 'December'
      };
      this.handleChangeMonth2 = this.handleChangeMonth2.bind(this);
      this.handleChangeMonth1 = this.handleChangeMonth1.bind(this);
      this.fetchData = this.fetchData.bind(this);
    }

    handleChangeMonth2(event) {
      this.setState({defaultMonth2: event.value});
    }

    handleChangeMonth1(event) {
      this.setState({defaultMonth: event.value});
    }

    componentWillMount() {
      this.fetchData();
    }

    fetchData(event) {
      let startmonth, endmonth;
      let startmonth1 = this.state.months.indexOf(this.state.defaultMonth)+1;
      let endmonth1 =this.state.months2.indexOf(this.state.defaultMonth2)+1;
      if (startmonth1 < 10) {
        startmonth = '0' + startmonth1;
      }
      else {
        startmonth = startmonth1;
      }

      if (endmonth1 < 10) {
        endmonth = '0' + endmonth1;
      }
      else {
        endmonth = endmonth1;
      }
      let url = 'http://localhost:5000/dashboard/'+this.state.defaultYear + '-' + startmonth + '-01/'+this.state.defaultYear + '-' + endmonth + '-28';
      console.log(url);
      fetch(url, {mode: 'cors'})
      .then(function(response) {
        if (response.status >= 400) {
           throw new Error("Bad response from server");
        }
        return response.json();
      })
      .catch(function(err){
        console.log('Error: ', err);
      })
      .then((json) => {
        this.setState({
        totalSales: json.totalSales,
        totalPurchases: json.totalPurchases,
        topCustomersCompany: json.topCustomersCompany,
        topCustomersTotal: json.topCustomersTotal,
        topSuppliersName: json.suppliersName,
        topSuppliersWebsite: json.suppliersWebsite,
        topSuppliersAddress: json.suppliersAddress,
        inventoryValue: json.inventoryValue,
        grossprofit: json.grossProfit
      });
    })
    }
    
    createVectors() {
      let rows = [];
      for (let i = 0; i < this.state.topSuppliersAddress.length; i++) {
        rows.push(<tr>
          <td>{this.state.topSuppliersName[i]}</td>
          <td>{this.state.topSuppliersAddress[i]}</td>
          <td>{this.state.topSuppliersWebsite[i]}</td>
        </tr>);
      }
      return rows;
    }

    render() {
      var pie1 = {
        labels: this.state.topCustomersCompany,
        datasets: [
            {
                data: this.state.topCustomersTotal,
                backgroundColor: [
                  bluedgreen,
                  darkblue,
                  lightpurple,
                  blue,
                  grey
                ],
            }],
      };
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

                            <div style={rowPadding}>
                                <Row>
                                    <Col xs="0" sm="1" lg="1">
                                        <div style={topPadding}>Timespan:</div>
                                    </Col>
                                    <Col xs="6" sm="5" lg="2" >
                                        <Dropdown options={this.state.years} value={this.state.defaultYear} placeholder="Select an option" />
                                    </Col>
                                    <Col xs="6" sm="5" lg="2">
                                        <Dropdown options={this.state.months} onChange={this.handleChangeMonth1} value={this.state.defaultMonth} placeholder="Select an option" />
                                    
                                    </Col>
                                    <Col xs="1" sm="1" lg="1">
                                        <div style={topPadding}> until </div></Col>
                                    <Col xs="6" sm="5" lg="2" >
                                        <Dropdown options={this.state.years} value={this.state.defaultYear} placeholder="Select an option" />
                                    </Col>
                                    <Col xs="6" sm="5" lg="2" >
                                        <Dropdown options={this.state.months} onChange={this.handleChangeMonth2} value={this.state.defaultMonth2} placeholder="Select an option" />
                                    </Col>

                                    <Col xs="6" sm="5" lg="2">
                                        <div style={exportButtonTopPadding}>
                                            <ButtonGroup>
                                                <ButtonToolbar>
                                                    <Button color="success" onClick={this.fetchData}>Export</Button>
                                                </ButtonToolbar>
                                            </ButtonGroup>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                            
                        <Row>
                            <Col xs="12" sm="6" lg="3">
                                <Card className="text-white bg-info">
                                    <CardBody className="pb-0">
                                        <div className="text-value">Total Sales</div>
                                        <div key={this.state.totalSales} style={paddingCard}>{this.state.totalSales} €</div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" lg="3">
                                <Card className="text-white bg-primary">
                                    <CardBody className="pb-0">
                                        <div className="text-value">Total Purchases</div>
                                        <div key={this.state.totalPurchases} style={paddingCard}>{this.state.totalPurchases} €</div>                                        
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" lg="3">
                                <Card className="text-white bg-info">
                                    <CardBody className="pb-0">
                                        <div className="text-value">Gross Profit</div>
                                        <div style={paddingCard}>{Number(Math.round(this.state.grossprofit +'e2')+'e-2')}</div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" lg="3">
                                <Card className="text-white bg-primary">
                                    <CardBody className="pb-0">
                                        <div className="text-value">Inventory Value</div>
                                        <div key={this.state.inventoryValue} style={paddingCard}>{this.state.inventoryValue} €</div>
                                    </CardBody>        
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" sm="6">
                                <Card>
                                    <CardHeader>
                                        All time Top Customers
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
                                    <i className="fa fa-align-justify"></i>All time Top suppliers
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>Company Name</th>
                                        <th>Company Address</th>
                                        <th>Company Website</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.createVectors()}
                                    </tbody>
                                    </Table>
                                </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        </div>
                    </main>
                </div>
            </div>  
        );
    }
}

export default DefaultLayout;