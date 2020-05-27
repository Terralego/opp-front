import React from 'react';

import { Slider, AnchorButton } from '@blueprintjs/core';


export class ZoomControl extends React.PureComponent {
  updateScale = eventScale => {
    const { onChange } = this.props;
    onChange(Math.min(Math.max(eventScale, 1), 4));
  }

  decreaseScale = () => {
    const { scale, step } = this.props;
    this.updateScale(scale - step);
  }

  increaseScale = () => {
    const { scale, step } = this.props;
    this.updateScale(scale + step);
  }

  render () {
    const { scale, onChange, step } = this.props;
    return (
      <div className="zoom__compare">
        <AnchorButton
          className="zoom__button"
          icon="zoom-out"
          disabled={scale === 1}
          onClick={this.decreaseScale}
        />
        <div className="zoom__container">
          <Slider
            value={scale}
            min={1}
            max={4}
            stepSize={step}
            onChange={onChange}
          />
        </div>
        <AnchorButton
          className="zoom__button"
          icon="zoom-in"
          disabled={scale === 4}
          onClick={this.increaseScale}
        />
      </div>
    );
  }
}

export default (ZoomControl);
