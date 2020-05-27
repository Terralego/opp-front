import { connectViewpointProvider } from '../../../../context';
import { connectSettingsProvider } from '../../../../../../components/SettingsProvider';

import SyncMap from './SyncMap';

export default connectSettingsProvider(({ env: { map } }) => ({
  configMap: map,
}))(connectViewpointProvider(({ viewpoint: { point: { coordinates } } }) => ({
  coordinates,
}))(SyncMap));
