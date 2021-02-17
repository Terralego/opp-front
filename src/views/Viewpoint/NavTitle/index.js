import React from 'react';
import { NavLink } from 'react-router-dom';

import { Navbar, NavbarGroup, Alignment, Button } from '@blueprintjs/core';

import './nav-viewpoint.scss';

export class NavTitle extends React.PureComponent {
  render() {
    const {
      viewpoint: { id, label },
      to,
      isNavBarVisible,
      toggleNavBar,
    } = this.props;
    return (
      <Navbar className="navTop">
        <NavbarGroup className="navTop__go-back" align={Alignment.LEFT}>
          <NavLink to={to.replace(/{{id}}/, id)}>
            <Button
              icon="arrow-left"
              onClick={() => !isNavBarVisible && toggleNavBar && toggleNavBar()}
              minimal
            />
          </NavLink>
        </NavbarGroup>
        <NavbarGroup className="navTop__viewpoint-name" align={Alignment.CENTER}>
          <img src="/images/icon_poi.svg" className="icon" alt="" />
          <Navbar.Heading>
            <h2>{label}</h2>
          </Navbar.Heading>
        </NavbarGroup>
      </Navbar>
    );
  }
}
export default NavTitle;
