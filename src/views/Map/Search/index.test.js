import React from 'react';
import renderer from 'react-test-renderer';

import Search from './Search';

jest.mock('./SearchForm', () => () => <p>SearchFormMock</p>);

it('should render', () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
});
