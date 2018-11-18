import React, { Component } from 'react';
import { Badge, DropdownIem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import small from '../../assets/img/brand/small.svg';


const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    render() {

        //eslint-disable-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppNavbarBrand
                    full={{ src: logo, width: 89, height: 25, alt: 'Feup Logo' }}
                    minimized={{ src: small, width: 30, height: 30, alt: 'Feup Logo'}}        
                />
                <AppSidebarToggler className="d-md-down-none" display="lg" />
               
                <Nav className="d-md.down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink href="/">Cenas 1</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="/">Cenas 2</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="/">Cenas 3</NavLink>
                    </NavItem>
                </Nav>
                <AppAsideToggler className="d-md-down-none" />
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;