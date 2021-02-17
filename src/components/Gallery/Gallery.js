import React from 'react';

import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';

import DraggableGalleryItem from './GalleryItem/DraggableGalleryItem';
import GalleryItem from './GalleryItem';

import './gallery.scss';

export class Gallery extends React.PureComponent {
  static propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.object),
    selectedPictures: PropTypes.arrayOf(PropTypes.object),
    handleClickPicture: PropTypes.func,
    handleDragPicture: PropTypes.func,
    t: PropTypes.func,
  };

  static defaultProps = {
    pictures: [],
    selectedPictures: [],
    handleClickPicture() {},
    handleDragPicture() {},
    t() {},
  };

  /**
   * Get the picture index (position)
   * @returns {any}
   * @param idPicture
   */
  getPictureIndex = idPicture => {
    const { selectedPictures } = this.props;
    const index = selectedPictures.findIndex(
      selectedPicture => selectedPicture && selectedPicture.id === idPicture,
    );
    return index > -1 ? index : '';
  };

  /**
   * Check if pictures are selected for the comparison view
   * @returns {*}
   * @param idPicture
   */
  isPicturesSelected = idPicture => {
    const { selectedPictures } = this.props;
    return selectedPictures.some(
      selectedPicture => selectedPicture && selectedPicture.id === idPicture,
    );
  };

  render() {
    const {
      match: {
        url,
        params: { id },
      },
      pictures,
      draggable,
      selectedPictures,
      handleClickPicture,
      handleDragPicture,
      enableDnd = true,
      t,
    } = this.props;

    const GalleryItemComponent = enableDnd ? DraggableGalleryItem : GalleryItem;

    return (
      <div className="gallery">
        <div className="gallery__collection">
          {!!pictures &&
            pictures.map(picture => (
              <GalleryItemComponent
                key={picture.id}
                picture={picture}
                selectedIndex={this.getPictureIndex(picture.id)}
                selected={this.isPicturesSelected(picture.id)}
                draggable={draggable}
                selectedPictures={selectedPictures}
                onClick={handleClickPicture}
                onDrag={handleDragPicture}
              />
            ))}
        </div>

        <div className="action-compare">
          <NavLink to={draggable ? `/viewpoint/${id}` : `${url}/compare`}>
            <Button intent={Intent.NONE} icon="folder-shared-open">
              {draggable ? t('gallery.backToViewPoint') : t('gallery.compareViewPoints')}
            </Button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Gallery;
