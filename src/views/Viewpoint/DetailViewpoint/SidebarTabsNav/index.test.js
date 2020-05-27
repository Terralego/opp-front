import React from 'react';
import renderer from 'react-test-renderer';

import SidebarTabsNav from '.';


jest.mock('@blueprintjs/core', () => ({
  Tabs: ({ children }) => children,
  Tab: () => <p>Tab</p>,
}));

jest.mock('../../../../components/Visualizer/Visualizer', () => ({
  addCustomIcon: () => null,
}));

it('should render', () => {
  const tree = renderer.create((
    <SidebarTabsNav />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});
