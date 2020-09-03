import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { CONTROLS_BOTTOM_RIGHT } from '@terralego/core/modules/Map/Map';
import InteractiveMap, { CONTROL_BACKGROUND_STYLES } from '@terralego/core/modules/Map/InteractiveMap';
import { useTranslation } from 'react-i18next';

import { addCustomIcon } from '../../../../../../components/Visualizer/Visualizer';
import MapErrorConfiguration from '../../../../../../components/MapErrorConfiguration';

import './syncmap.scss';

const SyncMap = ({
  configMap: { zoom, ...configMap },
  coordinates,
}) => {
  const {
    i18n: {
      getResourceBundle,
      language,
      store: { options: { fallbackLng } },
    },
    t,
  } = useTranslation();

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

  const props = useMemo(() => ({
    ...configMap,
    customStyle: { layers },
    zoom: zoom + 1,
    center: coordinates,
    onMapInit: addCustomIcon,
    controls: [{
      control: CONTROL_BACKGROUND_STYLES,
      position: CONTROLS_BOTTOM_RIGHT,
    }],
  }), [configMap, coordinates, layers, zoom]);

  if (!configMap.accessToken || !configMap.backgroundStyle) {
    return (
      <MapErrorConfiguration />
    );
  }

  const { terralego: { map: locale } } = getResourceBundle(language.split('-')[0]) || getResourceBundle(fallbackLng[0]);

  return (
    <div className="minimap">
      <InteractiveMap
        {...props}
        locale={locale}
        onStyleChange={(_, map) => addCustomIcon(map)}
        translate={t}
      />
    </div>
  );
};

SyncMap.propTypes = {
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
  coordinates: PropTypes.arrayOf(PropTypes.number),
};

SyncMap.defaultProps = {
  configMap: {},
  coordinates: [],
};


export default SyncMap;
