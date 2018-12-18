import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Button, ButtonGroup, ButtonToolbar, Table } from 'reactstrap';
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


let exportButtonTopPadding = {
  paddingTop: '2px',
}

var sale = {
    InvoiceDate: '',
    CreditAmount: 0,
}

const options = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false
}

class Sales extends Component {
    constructor (props) {
        super(props);

        this.state = {
          salesYTD: null,
          customerSales: [{},{}],
          totalSales: "0",
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
        this.fetchSales = this.fetchSales.bind(this);
    }

    handleChangeMonth2(event) {
      console.log(event);
      this.setState({defaultMonth2: event.value});
    }

    handleChangeMonth1(event) {
      console.log(event);
      this.setState({defaultMonth: event.value});
    }

    componentWillMount() {
        this.fetchSales();
        this.fetchCustomerSales();
    }

    fetchSales(event) {
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
      fetch('http://localhost:5000/sales/'+this.state.defaultYear + '-' + startmonth + '-01/'+this.state.defaultYear + '-' + endmonth + '-30', 
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
      .then((json) => this.populateSalesYTD(json))
      this.fetchTotalSales();
    }
    
    populateSalesYTD(json) {
        let data = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
        for (let i = 0; i < json.length; i++) {
            let month = parseInt(json[i].InvoiceDate.split("-")[1]);
            //console.log(month);

            data[month-1] += json[i].CreditAmount;
        }

        for (let i = 0; i < data.length; i++) {
            data[i] = Number(Math.round(data[i]+'e2')+'e-2');
        }
        this.setState({salesYTD: data});
    }

    fetchCustomerSales() {
        fetch('http://localhost:5000/customerSales', 
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
        .then((json) => this.setState({customerSales: json}))
    }

    fetchTotalSales() {
      console.log('fetch called!');
      console.log('month1: ', this.state.defaultMonth);
      console.log('month2: ', this.state.defaultMonth2);
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
        fetch('http://localhost:5000/dashboard/salestotal/'+this.state.defaultYear + '-' + startmonth + '-01/'+this.state.defaultYear + '-' + endmonth + '-30', 
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
        .then((json) => this.setState({totalSales: Math.floor(json[0]['sum(CreditAmount)']).toLocaleString()}))
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
                    label: 'Sales YTD',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.salesYTD,
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
                                                    <Button color="success" onClick={this.fetchSales}>Export</Button>
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
                                                    <div className="text-value">Total Sales</div>
                                                    <div style={paddingCard}>{this.state.totalSales} €</div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col>
                                    <Card>
                                        <CardHeader>
                                            All Time Top Customers
                                        </CardHeader>
                                        <CardBody>
                                            <Table responsive size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Company Name</th>
                                                        <th>Sales</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.customerSales.map(function(item, key) {
                                                        return (
                                                            <tr key = {key}>
                                                                <td>{item.CompanyName}</td>
                                                                <td>{item.GrossTotal}</td>
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

                                <Col xs="12" sm="6" lg="12">
                                    <Card>
                                        <CardHeader>
                                            Sales YTD
                                        <div className="card-header-actions">
                                                <a href="http://www.chartjs.org" className="card-header-action">
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

export default Sales;