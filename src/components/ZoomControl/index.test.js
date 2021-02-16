import React from 'react';
import renderer from 'react-test-renderer';

import ZoomControl from './index';

it('should render', () => {
  const onChange = jest.fn();
  const step = 0.5;
  const scale = 1;

  const tree = renderer
    .create(<ZoomControl scale={scale} step={step} onChange={onChange} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
