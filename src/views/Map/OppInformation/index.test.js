import React from 'react';
import renderer from 'react-test-renderer';

import OppInformation from './OppInformation';

it('should render', () => {
  const tree = renderer.create((
    <OppInformation />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});
