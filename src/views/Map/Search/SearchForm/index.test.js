import React from 'react';
import renderer from 'react-test-renderer';

import SearchForm from './SearchForm';

it('should render', () => {
  const tree = renderer.create(<SearchForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
