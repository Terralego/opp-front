import React from 'react';
import PropTypes from 'prop-types';

import Map, {
  CONTROL_ATTRIBUTION,
  CONTROLS_BOTTOM_RIGHT,
} from '@terralego/core/modules/Map/Map';
import SyncMaps, { SyncedMap } from '@terralego/core/modules/Map/SyncMaps';

import { addCustomIcon } from '../../../../../../components/Visualizer/Visualizer';
import MapErrorConfiguration from '../../../../../../components/MapErrorConfiguration';

import './syncmap.scss';

const SyncMap = ({
  configMap: { accessToken, backgroundStyle, zoom, ...restConfigMap },
  coordinates,
}) => {
  if (!accessToken || !backgroundStyle) {
    return (
      <MapErrorConfiguration />
    );
  }

  const layers = [{
    id: 'viewpoint',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates,
      },
    },
    layout: {
      'icon-image': 'marker-poi',
      'icon-size': 0.5,
      'icon-anchor': 'bottom',
      'icon-allow-overlap': true,
    },
  }];

  const sharedProps = {
    displayAttributionControl: false,
    displayNavigationControl: false,
    displayScaleControl: false,
    ...restConfigMap,
    accessToken,
    customStyle: { layers },
    zoom: zoom + 1,
    center: coordinates,
    onMapInit: addCustomIcon,
    controls: [{
      control: CONTROL_ATTRIBUTION,
      position: CONTROLS_BOTTOM_RIGHT,
    }],
  };

  const [plan, satellite] = backgroundStyle;

  return (
    <div id="map-line">
      <SyncMaps>
        <SyncedMap>
          <Map
            {...sharedProps}
            backgroundStyle={plan.url}
          />
        </SyncedMap>
        <SyncedMap>
          <Map
            {...sharedProps}
            backgroundStyle={satellite.url}
          />
        </SyncedMap>
      </SyncMaps>
    </div>
  );
};

SyncMap.propTypes = {
  configMap: PropTypes.shape({
    accessToken: PropTypes.string,
    backgroundDefault: PropTypes.string,
    backgroundSatellite: PropTypes.string,
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    maxBounds: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.array), PropTypes.bool]),
  }),
  coordinates: PropTypes.arrayOf(PropTypes.number),
};

SyncMap.defaultProps = {
  configMap: {},
  coordinates: [],
};


export default SyncMap;
