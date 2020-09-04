import { connectViewpointProvider } from '../../../../context';
import { connectSettingsProvider } from '../../../../../../components/SettingsProvider';

import Minimap from './Minimap';

export default connectSettingsProvider(({ env: { map, minimap } }) => ({
  configMap: map,
  configMiniMap: minimap,
}))(connectViewpointProvider(({ viewpoint: { point: { coordinates } } }) => ({
  coordinates,
}))(Minimap));
