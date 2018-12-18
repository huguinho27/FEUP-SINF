import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Table, Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'whatwg-fetch';
import 'isomorphic-fetch';


import {
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

import DefaultHeader from '../../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../../containers/DefaultLayout/DefaultFooter';

const padding = {
    paddingLeft: '20px',
    paddingRight: '20px'
};

const paddingCard = {
    paddingBottom: '20px'
}

const topPadding = {
    paddingTop: '7px',
}

const rowPadding = {
    paddingBottom: '20px'
}

const years = [
    2019
]
const defaultYear = years[0]
const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'

]
const defaultMonth = months[1]

const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};
const options = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false
}

const exportButtonTopPadding = {
    paddingTop: '2px',
}

class Purchases extends Component {
    constructor (props) {
      super(props);

      this.state = {
          purchasesYTD: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          suppliers: [{},{}],
          totalPurchases: 0,
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
      }
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

    fetchData() {
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
      let url = 'http://localhost:5000/purchases/'+this.state.defaultYear + '-' + startmonth + '-01/'+this.state.defaultYear + '-' + endmonth + '-30';
      fetch(url,)
      .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
      })
      .catch(function(err){
          console.log(err);
      })
      .then((json) => {
        this.populatePurchases(json.chartData);
        this.setState({
          totalPurchases: json.purchases,
          suppliers: json.suppliers
        });
        
      })
    }

    populatePurchases(json) {
      this.setState({
        totalSales: 0,
        totalPurchases: 0,
        topCustomersCompany : [0,0,0,0,0],
        topCustomersTotal: [0,0,0,0,0],
        topSuppliersName: [],
        topSuppliersWebsite: [],
        topSuppliersAddress: [],
        inventoryValue: 0
      });

      let data = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
        for (let i = 0; i < json.length; i++) {
            let month = parseInt(json[i].DataDoc.split("-")[1]);

            data[month-1] += json[i].Column1;
        }

        for (let i = 0; i < data.length; i++) {
            data[i] = Number(Math.round(data[i]+'e2')+'e-2');
        }
        this.setState({purchasesYTD: data});
        console.log(this.state.purchasesYTD);
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
        var bar = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            datasets: [
                {
                    label: 'Purchases YTD',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.purchasesYTD,
                },
            ],
        }
        return (
            <div className="app">
                <AppHeader fixed>
                    <DefaultHeader>
                    </DefaultHeader>
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
                                <Col>
                                    <Card className="text-white bg-primary">
                                        <CardHeader>
                                            <div className="text-value">Overview</div>
                                        </CardHeader>
                                        <CardBody className="pb-0 bg-info">
                                            <Row>
                                                <Col>
                                                    <div className="text-value">Total Purchases</div>
                                                    <div style={paddingCard}> {this.state.totalPurchases} €</div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <CardHeader>
                                            Top Suppliers
                                        </CardHeader>
                                        <CardBody>
                                            <Table responsive size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>CompanyName</th>
                                                        <th>Billing Address Detail</th>
                                                        <th>Website</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.suppliers.map(function(item, key) {
                                                        return (
                                                            <tr key = {key}>
                                                                <td>{item.CompanyName}</td>
                                                                <td>{item.BillingAddressDetail}</td>
                                                                <td>{item.Website}</td>
                                                            </tr>
                                                        )
                                                    
                                                    })}
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" lg="12">
                                    <Card>
                                        <CardHeader>
                                            Purchases YTD
                                            <div className="card-header-actions">
                                            <a className="card-header-action">
                                                <small className="text-muted"></small>
                                            </a>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="chart-wrapper">
                                                <Bar data={bar} height={100} options={options} />
                                            </div>
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

export default Purchases;
