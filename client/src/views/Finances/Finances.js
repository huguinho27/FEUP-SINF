import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Table } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
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
const boldLetters = {
    fontWeight: 'bold'
}

class Finances extends Component {
  constructor (props) {
    super(props);

    this.state = {
      salesgrowth: 0,
      purchasesgrowth: 0,
      revenue: 0,
      expenses: 0,
      grossProfit: 0,
      incomeTaxes: 0,
      netEarnings: 0,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData(event) {
    fetch('http://localhost:5000/finances', {mode: 'cors'})
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
        salesgrowth: json.externalQuarterGrowthSales,
        purchasesgrowth: json.externalQuarterGrowthPurchases,
        /*revenue: json.revenue,
        expenses: json.expenses,
        grossProfit: json.grossProfit,
        incomeTaxes: json.incomeTaxes,
        netEarnings: json.netEarnings,*/
    });
  })
  }

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
                                    <Card>
                                        <CardHeader>
                                            <div className="text-value">Profit and Loss Statement</div>
                                        </CardHeader>
                                        <CardBody>
                                            <Table responsive>
                                                <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>2019</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={boldLetters}>Total Net Revenue</td>
                                                        <td>TODO</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={boldLetters}>Total Expenses</td>
                                                        <td>TODO</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={boldLetters}>Gross Profit</td>
                                                        <td>TODO</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={boldLetters}>Income Taxes</td>
                                                        <td>TODO</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={boldLetters}>Net Earnings</td>
                                                        <td>TODO</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col>
                                    
                                    <Card>
                                        <CardHeader>
                                            <i className="fa fa-align-justify"></i> Sales and Purchases Growth
                                        </CardHeader>
                                        <CardBody>
                                            <Table responsive>
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>Sales Growth</th>
                                                <th>Purchases Growth</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={boldLetters}>First and Last Quarters</td>
                                                </tr>
                                            </tbody>
                                            </Table>
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