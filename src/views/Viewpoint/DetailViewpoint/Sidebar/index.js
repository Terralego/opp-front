import React from 'react';
import SidebarTabsNav from '../SidebarTabsNav';
import SidebarBottomActions from '../SidebarBottomActions';

import './sidebar.scss';

const Sidebar = () => (
  <div className="sidebar">
    <SidebarTabsNav />
    <SidebarBottomActions />
  </div>
);

export default Sidebar;
