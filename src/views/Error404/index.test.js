import React from 'react';
import renderer from 'react-test-renderer';

import Error404 from '.';

jest.mock('react-router-dom', () => ({
  NavLink: props => <span {...props} />,
}));

jest.mock('@blueprintjs/core', () => ({
  H1: () => <div>blueprint h1</div>,
}));

it('should render', () => {
  const tree = renderer.create((
    <Error404 />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});
