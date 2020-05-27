import React from 'react';
import renderer from 'react-test-renderer';

import NavTitle from '.';

jest.mock('react-router-dom', () => ({
  NavLink: () => null,
}));

it('should render', () => {
  const data = {};
  const to = '';
  const tree = renderer.create((
    <NavTitle to={to} viewpoint={data} />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});
