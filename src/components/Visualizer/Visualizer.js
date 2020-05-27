import React from 'react';

import { Classes } from '@blueprintjs/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { InteractiveMap } from '@terralego/core';

import { getInteractions } from './interactions';
import { getCustomStyle } from './utils/customStyle';

import MapErrorConfiguration from '../MapErrorConfiguration';

import './visualizer.scss';

export const addCustomIcon = map => {
  map.loadImage('/images/opp-map-pin-shadow.png', (error, image) => {
    if (error) throw error;
    map.addImage('marker-poi', image);
  });
  map.loadImage('/images/opp-map-pin-highlight.png', (error, image) => {
    if (error) throw error;
    map.addImage('marker-poi-highlighted', image);
  });
};

export class Visualizer extends React.Component {
  static propTypes = {
    setMap: PropTypes.func,
  };

  static defaultProps = {
    setMap () {},
  };

  resetMap = map => {
    const { setMap } = this.props;
    setMap(map);
  };

  onClusterUpdate = ({ features }) => {
    const { allFilteredFeatures, filteredViewpoints } = this.props;

    // filteredViewpoints allow to force display no result on map
    if (allFilteredFeatures.length > 0 || filteredViewpoints.count === 0) {
      return allFilteredFeatures;
    }
    return features;
  };

  render () {
    const {
      t,
      history,
      env: { API_PROVIDER },
      mapIsResizing,
      configMap,
      interactiveMapInit,
    } = this.props;

    if (!configMap.accessToken || !configMap.backgroundStyle) {
      return (
        <MapErrorConfiguration className="visualizer-error" />
      );
    }

    return (
      <div
        className={classnames({
          'visualizer-opp': true,
          'visualizer-opp--is-resizing': mapIsResizing,
        })}
      >
        <InteractiveMap
          onClusterUpdate={this.onClusterUpdate}
          onMapInit={addCustomIcon}
          onStyleChange={(bg, map) => addCustomIcon(map)}
          onMapLoaded={this.resetMap}
          {...configMap}
          hash
          history={history}
          customStyle={getCustomStyle(API_PROVIDER)}
          interactions={getInteractions(API_PROVIDER, history)}
          onInit={interactiveMapInit}
          className={Classes.DARK}
          translate={t}
        />
      </div>
    );
  }
}

export default Visualizer;
