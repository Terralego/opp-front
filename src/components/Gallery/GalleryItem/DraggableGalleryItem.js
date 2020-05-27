import React from 'react';
import { useDrag } from 'react-dnd';

import GalleryItem from './GalleryItem';

export const DraggableGalleryItem = ({ picture, ...props }) => {
  const [, dragRef] = useDrag({
    item: { type: 'picture', picture },
  });

  return (
    <div ref={dragRef}>
      <GalleryItem picture={picture} {...props} />
    </div>
  );
};

export default DraggableGalleryItem;
