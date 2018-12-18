import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

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

const topPadding = {
    paddingTop: '7px',
}

const rowPadding = {
    paddingBottom: '20px'
}

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

const years = [
    '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2017', '2018', 2019
]
const defaultYear = years[8]
const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'

]
const defaultMonth = months[4]


class Finances extends Component {
    

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

                        <div style={rowPadding}>
                            </div>

                            <Row>
                                <Col>
                                    <Card className="text-white bg-primary">
                                        <CardHeader>
                                            <div className="text-value">Profit and Loss Statement</div>
                                        </CardHeader>
                                        <CardBody className="pb-0 bg-info">
                                            <div className="text-value">Sales and Revenue:</div>
                                            <div style={paddingCard}> </div>
                                            <div className="text-value">Operating Costs:</div>
                                            <div style={paddingCard}> </div>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col>
                                    <Card>
                                        <CardHeader>
                                            <div className="text-value">Finances</div>
                                            <div>Operating Costs, Sales and Revenues</div>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="chart-wrapper">
                                                <Line data={line} options={options} />
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

export default Finances;