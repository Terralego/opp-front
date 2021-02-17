import React from 'react';
import renderer from 'react-test-renderer';
import Map from './Map';

jest.mock('../../components/Visualizer', () => () => <p>VisualizerMock</p>);
jest.mock('./OppInformation', () => () => <p>OppInformationMock</p>);
jest.mock('./Search', () => () => <p>Search</p>);
jest.mock('./Results', () => () => <p>Results</p>);

it('should render', () => {
  const tree = renderer.create(<Map />).toJSON();
  expect(tree).toMatchSnapshot();
});
