import React from 'react';
import classNames from 'classnames';

import DateDisplay from '../../DateDisplay';

import './gallery-item.scss';

export class GalleryItem extends React.Component {
  /**
   * Update current picture dispalyed
   * @returns {Function}
   */
  onChangePicture = () => {
    const { onPictureChange, picture } = this.props;
    onPictureChange(picture);
  };

  /**
   * Allow to drag a picture
   */
  onDrag = () => {
    const { onPictureDrag, picture } = this.props;
    onPictureDrag(picture);
  };

  render() {
    const { draggable, picture, selectedIndex, selected, onClick, onDrag } = this.props;
    const { title = 'gallery item' } = picture;

    return (
      <div
        role="button"
        tabIndex="0" // can be tabbable
        className={classNames({
          gallery___item: true,
          drag: draggable,
          'image-selected': selected,
          [`selection-${selectedIndex}`]: draggable,
        })}
        onClick={() => onClick(picture)}
        onKeyPress={() => onClick(picture)}
      >
        <img
          src={picture.file.thumbnail}
          alt={title}
          draggable={draggable}
          onDrag={() => onDrag(picture)}
        />
        <span className="date-time">
          <DateDisplay date={picture.date} dayOnly />
        </span>
      </div>
    );
  }
}

export default GalleryItem;
