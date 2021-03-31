import React from 'react';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';

import { Classes, Icon, PopoverInteractionKind, Popover, Position } from '@blueprintjs/core';
import throttle from 'throttleit';

import Sidebar from './Sidebar';
import { getFullName } from '../../../services/user';
import ZoomControl from '../../../components/ZoomControl';
import DateDisplay from '../../../components/DateDisplay';

import { getZoom, getNewScale } from '../../../utils/helper/pictures';
import {
  getAllowedTranslation,
  getDimensionsToCenterCoordinates,
} from '../../../utils/helper/domGeometry';

import './detail-viewpoint.scss';

const STEP_SCALE = 0.2;

export class DetailViewpoint extends React.PureComponent {
  state = {
    scale: 1,
    transformOrigin: { x: 0, y: 0 },
    translate: { x: 0, y: 0 },
  };

  detailviewDivRef = React.createRef();

  panning = false;

  panningInitialPosition = {};

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onChange = value => {
    const { x, y } = this.getPictureCenter();
    this.setState(getZoom(x, y, value));
  };

  onWheel = ({ nativeEvent: { offsetX: x, offsetY: y }, deltaY }) => {
    const { scale } = this.state;
    this.setState(getZoom(x, y, getNewScale(scale, deltaY, STEP_SCALE)));
  };

  getPictureCenter = () =>
    getDimensionsToCenterCoordinates(this.detailviewDivRef.current.getBoundingClientRect());

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
    const containerSize = this.detailviewDivRef.current.getBoundingClientRect();

    // Make sure image fits in inner container
    const resTranslation = getAllowedTranslation({
      transformOrigin,
      container: containerSize,
      translation: { x: translationX, y: translationY },
      scale,
    });

    this.setState({ translate: resTranslation });
  };

  onMouseDown = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    this.panning = true;
    this.panningInitialPosition = { x, y };
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseUp = () => {
    // Reset panning
    this.panning = false;
  };

  onMouseMove = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    if (this.panning) {
      this.handlePanning({ x, y });
    }
  };

  render() {
    const { picture, t = text => text } = this.props;

    if (!picture) return null;

    const { scale, transformOrigin, translate } = this.state;
    const {
      file: { full },
      date,
      owner,
      properties,
      properties: { meteo, index },
    } = picture;

    return (
      <>
        <div className="fullsize-image" ref={this.detailviewDivRef} style={{ overflow: 'hidden' }}>
          <div
            className="fullsize-container"
            style={{
              backgroundImage: `url(${full})`,
              transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
              transformOrigin: `${transformOrigin.x}px ${transformOrigin.y}px`,
              scale: `${scale}`,
              overflow: 'hidden',
            }}
            role="presentation"
            onWheel={throttle(this.onWheel, 150)}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onMouseMove={this.onMouseMove}
          />
          <div className={classnames('picture-metadata', Classes.DARK)}>
            <span className="picture-metadata--date">
              <DateDisplay date={date} />
            </span>
            <span className="picture-metadata--info">
              {t('viewPoint.photo.meta')}
              <Popover
                position={Position.RIGHT_BOTTOM}
                interactionKind={PopoverInteractionKind.HOVER}
                modifiers={{
                  offset: { offset: '0 15px' },
                }}
                content={
                  <div className="picture-metadata--popover">
                    <div>
                      <span className="label">{t('viewPoint.photo.id')}</span>
                      <span className="value">{index}</span>
                    </div>
                    <div>
                      <span className="label">{t('viewPoint.photo.owner')}</span>
                      <span className="value">{getFullName(owner)}</span>
                    </div>
                    <div>
                      <span className="label">{t('viewPoint.photo.weather')}</span>
                      <span className="value">{t('viewPoint.photo.meteo.' + meteo)}</span>
                    </div>
                    <div>
                      <span className="label">{t('viewPoint.photo.device')}</span>
                      <span className="value">
                        {`${properties.camera_brand} ${properties.camera_model}`}
                      </span>
                    </div>
                  </div>
                }
              >
                <Icon icon="info-sign" />
              </Popover>
            </span>
          </div>
        </div>
        <Sidebar />
        <ZoomControl scale={scale} step={STEP_SCALE} onChange={this.onChange} />
      </>
    );
  }
}

export default withTranslation()(DetailViewpoint);
