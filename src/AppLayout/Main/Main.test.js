import React from 'react';
import renderer from 'react-test-renderer';

import Main from './Main';

jest.mock('../Nav', () => () => (<p>HeaderMock</p>));
jest.mock('../Content', () => () => (<p>ContentMock</p>));

it('should render', () => {
  const tree = renderer.create((
    <Main />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});
