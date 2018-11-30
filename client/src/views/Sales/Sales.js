import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardHeader, Table, Badge } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
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
            salesYTD: null
        }
    }

    componentWillMount() {
        this.fetchSales();
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
        let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < json.length; i++) {
            let month = parseInt(json[i].InvoiceDate.split("-")[1]);
    
            data[month-1] += Math.floor(json[i].CreditAmount);
        }

        this.setState({salesYTD: data});
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
                                                    <div style={paddingCard}>125.000 €</div>
                                                </Col>
                                                <Col>
                                                    <div className="text-value">Growth</div>
                                                    <div style={paddingCard}>4,20 %</div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col>
                                    <Card>
                                        <CardHeader>
                                            Top Customers
                                        </CardHeader>
                                        <CardBody>
                                            <Table responsive size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Username</th>
                                                        <th>Date registered</th>
                                                        <th>Sales</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Carwyn Fachtna</td>
                                                        <td>2012/01/01</td>
                                                        <td>Member</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nehemiah Tatius</td>
                                                        <td>2012/02/01</td>
                                                        <td>Staff</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ebbe Gemariah</td>
                                                        <td>2012/02/01</td>
                                                        <td>Admin</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Eustorgios Amulius</td>
                                                        <td>2012/03/01</td>
                                                        <td>Member</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Leopold Gáspár</td>
                                                        <td>2012/01/21</td>
                                                        <td>Staff</td>
                                                    </tr>
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
                                                    <small className="text-muted">docs</small>
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
                <AppFooter>
                    <DefaultFooter />
                </AppFooter>
            </div>
        );
    }
}

export default Sales;