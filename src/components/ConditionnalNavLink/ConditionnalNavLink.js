import React from 'react';
import { NavLink } from 'react-router-dom';

export const ConditionnalNavLink = ({ active, children, ...props }) =>
  active ? <NavLink {...props}>{children}</NavLink> : children;

export default ConditionnalNavLink;
