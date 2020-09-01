import React from 'react';

import throttle from 'throttleit';

import CompareItem from './CompareItem';
import { ZoomControl } from '../../../components/ZoomControl';
import { getAllowedTranslation, getDimensionsToCenterCoordinates } from '../../../utils/helper/domGeometry';
import { getZoom, getNewScale } from '../../../utils/helper/pictures';

import './compare-pictures.scss';

const STEP_SCALE = 0.2;

export class ComparePictures extends React.Component {
  state = {
    mousePosition: {},
    reticules: [false, false],
    scale: 1,
    transformOrigin: { x: 0, y: 0 },
    translate: { x: 0, y: 0 },
  };

  compareDivRef = React.createRef();

  panning = false;

  panningInitialPosition = {};

  componentWillUnmount () {
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onDragOver = event => {
    event.preventDefault();
  };

  onDrop = (event, index) => {
    // This is to prevent firefox from display image full page
    event.preventDefault();
    // Prevent to drop any element other than an image
    // Avoid than draggablePicture be apply when elem is not an image
    if ((/[^/]+(jpe?g|png)$/).test(event.dataTransfer.getData('text'))) {
      const { handleDropPicture } = this.props;
      handleDropPicture(index);
    }
  };

  onMouseDown = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    this.panning = true;
    this.panningInitialPosition = { x, y };
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = ({ nativeEvent: { offsetX: x, offsetY: y } }, picture) => {
    if (this.panning) {
      this.handlePanning({ x, y });
    }

    if (picture) {
      this.getMousePosition(x, y);
    }
  };

  onMouseUp = () => {
    // Reset panning
    this.panning = false;
  };

  onWheel = ({ nativeEvent: { offsetX: x, offsetY: y }, deltaY }) => {
    const { scale } = this.state;
    this.setState(getZoom(x, y, getNewScale(scale, deltaY, STEP_SCALE)));
  };

  getMousePosition = (x, y) => {
    this.setState({ mousePosition: { x, y } });
  };

  /**
   * Handle panning event
   * @param x : current mouse position in x-axis
   * @param y : current mouse position in y-axis
   */
  handlePanning = ({ x, y }) => {
    const { translate, transformOrigin, scale } = this.state;

    if (scale <= 1) {
      return;
    }

    const translationX = translate.x + (x - this.panningInitialPosition.x);
    const translationY = translate.y + (y - this.panningInitialPosition.y);
    const containerSize = this.compareDivRef.current.childNodes[0].getBoundingClientRect();

    // Make sure image fits in inner container
    const resTranslation = getAllowedTranslation({
      transformOrigin,
      container: containerSize,
      translation: { x: translationX, y: translationY },
      scale,
    });

    this.setState({ translate: resTranslation });
  };

  toggleReticule = (index, display) => {
    const { selectedPictures } = this.props;
    this.setState(({ reticules }) => {
      const newDisplay = display === undefined ? !reticules[index] : display;
      const newReticules = [...reticules];
      newReticules[index] = !!(selectedPictures[index] && newDisplay);
      return { reticules: [...newReticules] };
    });
  };

  onChange = value => {
    const { x, y } = this.getPictureCenter();
    this.setState(getZoom(x, y, value));
  }

  getPictureCenter = () => getDimensionsToCenterCoordinates(
    this.compareDivRef.current.childNodes[0].getBoundingClientRect(),
  );


  render () {
    const { mousePosition, reticules, translate, scale, transformOrigin } = this.state;
    const { selectedPictures } = this.props;
    const {
      onDrop,
      onDragOver,
      toggleReticule,
      onMouseMove,
      onMouseDown,
      onWheel,
    } = this;
    const activateReticule = selectedPictures.every(elem => elem !== null);

    return (
      <>
        <div className="content__compare" ref={this.compareDivRef}>
          {selectedPictures.map((selectedPicture, index) => (
            <CompareItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              picture={selectedPicture}
              index={index}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onMouseMove={onMouseMove}
              onMouseDown={onMouseDown}
              toggleReticule={toggleReticule}
              activateReticule={activateReticule}
              mousePosition={mousePosition}
              showReticule={reticules[+(!index)]}
              onWheel={throttle(onWheel, 150)}
              transform={`scale(${scale}) translate(${translate.x}px, ${translate.y}px)`}
              transformOrigin={`${transformOrigin.x}px ${transformOrigin.y}px`}
              scale={scale}
            />
          ))}
        </div>

        <ZoomControl scale={scale} onChange={this.onChange} step={STEP_SCALE} />
      </>
    );
  }
}

export default (ComparePictures);
