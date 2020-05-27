import React from 'react';
import renderer from 'react-test-renderer';

import Gallery from './Gallery';

jest.mock('react-router-dom', () => ({
  NavLink: ({ children }) => children,
}));

it('should render', () => {
  const handleClickPicture = jest.fn();
  const handleDragPicture = jest.fn();
  const draggable = 'true';
  const match = { url: '/', params: { id: 1 } };
  const selectedPictures = [
    { id: 1, img: 'DalekOne', file: { thumbnail: 'thumbnail' } },
    { id: 2, img: 'DalekTwo', file: { thumbnail: 'thumbnail' } },
  ];
  const pictures = [
    { id: 1, img: 'DalekOne', file: { thumbnail: 'thumbnail' } },
    { id: 2, img: 'DalekTwo', file: { thumbnail: 'thumbnail' } },
  ];
  const tree = renderer.create((
    <Gallery
      match={match}
      pictures={pictures}
      handleClickPicture={handleClickPicture}
      handleDragPicture={handleDragPicture}
      selectedPictures={selectedPictures}
      draggable={draggable}
      enableDnd={false}
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});
