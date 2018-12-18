import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
  
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

class Inventory extends Component {
    constructor (props) {
      super(props);
      this.state = {
          productsBelowSecurityStock: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          productsInventory: [{},{}],
          inventoryValue: 0,
      }
    }

    componentWillMount() {
      this.fetchData();
    }

    fetchData() {
      fetch('http://localhost:5000/inventory',)
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
        this.setState({
          inventoryValue: json.inventoryValue,
          productsBelowSecurityStock: json.productsBelowSecurityStock,
          productsInventory: json.productsInventory
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
                           
                        <Row>

                            <Col lg="6">
                                <Card className="text-white bg-primary">
                                    <CardHeader>
                                        <div className="text-value">Inventory Value</div>
                                    </CardHeader>
                                    <CardBody className="pb-0 bg-info">
                                        <div style={paddingCard} className="text-value">{this.state.inventoryValue} €</div>
                                    </CardBody>
                                </Card>
                                <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Products in inventory
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value per Unit</th>
                                        <th>Quantity</th>
                                        <th>Total Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.productsInventory.map(function(item, key) {
                                      return (
                                        <tr key = {key}>
                                          <td>{item.name}</td>
                                          <td>{item.valuePerUnit}</td>
                                          <td>{item.quantity}</td>
                                          <td>{Math.floor(item.prodTotalValue).toLocaleString()}</td>
                                        </tr>
                                      )
                                    })}
                                    </tbody>
                                    </Table>
                                </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" lg="6">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Products Below Security Stock
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped>
                                    {this.state.productsBelowSecurityStock.map(function(item, key) {
                                      return (
                                        <tr >
                                          <td>{item.name}</td>
                                        </tr>
                                      )
                                    })}
                                    </Table>
                                </CardBody>
                                </Card>
                            </Col>
                        
                         </Row>

                        </div>
                        <div className="below security stock">
                            <Row>
                            <Col xs="12" lg="6">
                            
                                
                            </Col>
                            </Row>
                        </div>

                    </main>
                </div>
            </div>  
        );
    }
}

export default Inventory;