import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, CardColumns, Container, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
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

class Inventory extends Component {
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
                                <Card className="text-white bg-info">
                                    <CardHeader>
                                        <div className="text-value">Inventory Value</div>
                                    </CardHeader>
                                    <CardBody className="pb-0">
                                        <div style={paddingCard} className="text-value">125.000 €</div>
                                        {/* <div>Inventory Value</div> */}
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
                                    <tr>
                                        <td>Powerbank Miaomi Mi 2C</td>
                                        <td>24 €</td>
                                        <td>220</td>
                                        <td>5,280 €</td>
                                    </tr>
                                    <tr>
                                        <td>Memória RAM G.Skill V 16GB </td>
                                        <td>156 €</td>
                                        <td>140</td>
                                        <td>21,000 €</td>
                                    </tr>
                                    <tr>
                                        <td>Router Asus RT-AX88U</td>
                                        <td>428 €</td>
                                        <td>70</td>
                                        <td>29,960 €</td>
                                    </tr>
                                    <tr>
                                        <td>Portátil PNY Prevail Pro</td>
                                        <td>799 €</td> 
                                        <td>22</td>
                                        <td>17,578 €</td>
                                    </tr>
                                    </tbody>
                                    </Table>
                                    <Pagination>
                                    <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink tag="button">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                                    </Pagination>
                                </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" lg="6">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Below Security Stock
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped>
                                    <tr>
                                        <td>1- PC ASRock DeskMini</td>
                                    </tr>
                                    <tr>
                                        <td>2- Powerbank Miaomi Mi 2C</td>
                                    </tr>
                                    <tr>
                                        <td>3- Memória RAM G.Skill V 16GB</td>
                                    </tr>
                                    <tr>
                                        <td>4- Powerbank Miaomi Mi 2C</td>
                                    </tr>
                                    <tr>
                                        <td>5- Memória RAM G.Skill V 16GB</td>
                                    </tr>
                                    </Table>
                                    <Pagination>
                                    <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink tag="button">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                                    </Pagination>
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
                <AppFooter>
                    <DefaultFooter />
                </AppFooter>
            </div>  
        );
    }
}

export default Inventory;