import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
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

const options = {
tooltips: {
    enabled: false,
    custom: CustomTooltips
},
maintainAspectRatio: false
}

class Sales extends Component {
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
                                            <div className="text-value">Total Sales</div>
                                            <div>125.000 €</div>
                                            <div className="text-value">Growth</div>
                                            <div>4,20 %</div>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col>
                                    <Card>
                                        <CardHeader>
                                        Bar Chart
                                        <div className="card-header-actions">
                                            <a href="http://www.chartjs.org" className="card-header-action">
                                            <small className="text-muted">docs</small>
                                            </a>
                                        </div>
                                        </CardHeader>
                                        <CardBody>
                                        <div className="chart-wrapper">
                                            <Bar data={bar} options={options} />
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