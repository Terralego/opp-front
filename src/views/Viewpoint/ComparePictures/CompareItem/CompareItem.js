import React from 'react';
import classnames from 'classnames';
import { Icon } from '@blueprintjs/core';

import './compare-item.scss';
import { useDrop } from 'react-dnd';

import { useTranslation } from 'react-i18next';
import DragNDropPicture from './DragNDropPicture';

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

  const { t } = useTranslation();

  return (
    <div ref={drop} className={classnames('compare_transform', { canDrop, isOver })}>
      <div
        className="compare_item"
        role="presentation"
        style={{
          backgroundImage: picture && picture.file ? `url(${picture.file.full})` : '',
          transform: scale > 1 && picture ? transform : '',
          transformOrigin: scale > 1 && picture ? transformOrigin : '',
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
              transform: `scale(${1 / scale})`,
              display: `${showReticule ? 'block' : 'none'}`,
            }}
          />
        )}
        {!picture && (
          <div className="compare_placeholder">
            <em>{t('viewPoint.compare.placeholder')}</em>
            <Icon icon={<DragNDropPicture />} iconSize={80} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareItem;
