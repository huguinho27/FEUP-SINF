import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardHeader, Badge, Table } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

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

const padding= {
    paddingLeft: '20px',
    paddingRight: '20px'
};

const paddingCard = {
    paddingBottom: '20px'
}
const bar = {
labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
datasets: [
    {
    label: 'My First dataset',
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data: [65, 59, 80, 81, 56, 55, 40],
    },
],
};


//intel on line chart

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

class Purchases extends Component {
    render() {
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
                                                    <div className="text-value">Total Purchases</div>
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
                Top Suppliers
              </CardHeader>
              <CardBody>
              <Table responsive size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Username</th>
                                                        <th>Date registered</th>
                                                        <th>Purchases</th>
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
                            <Col xs="12" lg="12">
                            <Card>
               <CardHeader>
              Line Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={line} height ={250} options={options} />
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

export default Purchases;
