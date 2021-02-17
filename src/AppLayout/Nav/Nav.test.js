import React from 'react';
import renderer from 'react-test-renderer';

import Nav from './Nav';

jest.mock('react-router-dom', () => ({
  NavLink: ({ children, to }) => <a href={to}>{children}</a>,
}));

it('should render', () => {
  const tree = renderer.create(<Nav />).toJSON();
  expect(tree).toMatchSnapshot();
});
