import React from 'react';
import renderer from 'react-test-renderer';

import Viewpoint from './Viewpoint';

jest.mock('react-router-dom', () => ({
  NavLink: () => null,
  Route: () => null,
  Switch: ({ children }) => children,
  Link: () => null,
}));

jest.mock('./../../components/Gallery', () => () => (<p>Gallery</p>));

it('should render', () => {
  const match = { params: { imageView: '/' } };
  const tree = renderer.create((
    <Viewpoint match={match} />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});
