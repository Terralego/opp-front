import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  CONTROLS_BOTTOM_RIGHT,
  CONTROLS_BOTTOM_LEFT,
  CONTROL_SCALE,
} from '@terralego/core/modules/Map/Map';
import InteractiveMap, {
  CONTROL_BACKGROUND_STYLES,
} from '@terralego/core/modules/Map/InteractiveMap';
import { useTranslation } from 'react-i18next';
import merge from 'deepmerge';

import { addCustomIcon } from '../../../../../../components/Visualizer/Visualizer';
import MapErrorConfiguration from '../../../../../../components/MapErrorConfiguration';

import './Minimap.scss';

const Minimap = ({ configMap, configMiniMap, coordinates }) => {
  const { t } = useTranslation();

  const config = useMemo(() => merge.all([configMap, configMiniMap]), [configMap, configMiniMap]);

  const layers = [
    {
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
      weight: 850,
    },
  ];

  const props = useMemo(
    () => ({
      ...config,
      customStyle: { layers },
      center: coordinates,
      onMapInit: addCustomIcon,
      controls: [
        {
          control: CONTROL_BACKGROUND_STYLES,
          position: CONTROLS_BOTTOM_RIGHT,
        },
        {
          control: CONTROL_SCALE,
          position: CONTROLS_BOTTOM_LEFT,
        },
      ],
    }),
    [config, coordinates, layers],
  );

  if (!configMap.accessToken || !configMap.backgroundStyle) {
    return <MapErrorConfiguration />;
  }

  return (
    <div className="minimap">
      <InteractiveMap {...props} onStyleChange={(_, map) => addCustomIcon(map)} translate={t} />
    </div>
  );
};

Minimap.propTypes = {
  configMap: PropTypes.shape({
    accessToken: PropTypes.string,
    backgroundStyle: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      PropTypes.string,
    ]),
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    maxBounds: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.array), PropTypes.bool]),
  }),
  configMiniMap: PropTypes.shape(),
  coordinates: PropTypes.arrayOf(PropTypes.number),
};

Minimap.defaultProps = {
  configMap: {},
  configMiniMap: {},
  coordinates: [],
};

export default Minimap;
