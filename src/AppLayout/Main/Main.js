import React from 'react';

import Nav from '../Nav';
import Content from '../Content';

import './main.scss';

export const Main = ({ isNavBarVisible }) => (
  <main className="main">
    {isNavBarVisible && <Nav />}
    <Content />
  </main>
);

export default Main;
