import React from 'react';
import renderer from 'react-test-renderer';

import SidebarBottomActions from '.';

jest.mock('react-router-dom', () => ({
  Link: () => null,
}));

jest.mock('@blueprintjs/core', () => ({
  Navbar: ({ children }) => children,
  NavbarGroup: ({ children }) => children,
  Alignment: () => null,
  Classes: () => null,
  Button: () => <p>Button</p>,
}));

it('should render', () => {
  const tree = renderer.create(<SidebarBottomActions />).toJSON();
  expect(tree).toMatchSnapshot();
});
