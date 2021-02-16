import React from 'react';
import renderer from 'react-test-renderer';

import Sidebar from '.';

jest.mock('react-router-dom', () => ({
  NavLink: () => null,
  withRouter: ({ children }) => children,
  Route: () => null,
  Switch: () => null,
  Link: () => null,
}));

jest.mock('../SidebarTabsNav', () => () => <p>SidebarTabsNav</p>);
jest.mock('../SidebarBottomActions', () => () => <p>SidebarBottomActions</p>);

it('should render', () => {
  const tree = renderer.create(<Sidebar />).toJSON();
  expect(tree).toMatchSnapshot();
});
