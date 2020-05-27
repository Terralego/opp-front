import React from 'react';
import classnames from 'classnames';

import './compare-item.scss';
import { useDrop } from 'react-dnd';

export const CompareItem = ({
  picture,
  index,
  onDrop,
  onDragOver,
  toggleReticule,
  onMouseMove,
  mousePosition: { x, y },
  showReticule,
  onWheel,
  onMouseDown,
  transform,
  transformOrigin,
  scale,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'picture',
    collect: monitor => ({ isOver: !!monitor.isOver(), canDrop: !!monitor.canDrop() }),
  });

  return (
    <div ref={drop} className={classnames('compare_transform', { canDrop, isOver })}>
      <div
        className="compare_item"
        role="presentation"
        style={{
          backgroundImage: (picture && picture.file) ? `url(${picture.file.full})` : '',
          transform: scale > 1 ? transform : '',
          transformOrigin: scale > 1 ? transformOrigin : '',
        }}
        onDragOver={onDragOver}
        onDrop={event => onDrop(event, index)}
        onMouseEnter={() => toggleReticule(index, true)}
        onMouseMove={event => onMouseMove(event, picture)}
        onMouseLeave={() => toggleReticule(index, false)}
        onMouseDown={onMouseDown}
        onWheel={onWheel}
      >
        {picture && (
          <span
            className="reticule"
            style={{
              top: y,
              left: x,
              transform: `scale(${(1 / scale)})`,
              display: `${showReticule ? 'block' : 'none'}`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default (CompareItem);
