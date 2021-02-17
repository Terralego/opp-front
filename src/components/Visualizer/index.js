import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { connectSettingsProvider } from '../SettingsProvider';
import { connectAppProvider } from '../../AppLayout/context';
import withEnv from '../../config/withEnv';

import Visualizer from './Visualizer';

export default connectSettingsProvider(({ env: { map } }) => ({
  configMap: map,
}))(
  connectAppProvider({
    filteredViewpoints: 'filteredViewpoints.current',
    allFilteredFeatures: 'allFilteredFeatures',
    mapIsResizing: 'mapIsResizing',
    setMap: 'actions.setMap',
    interactiveMapInit: 'actions.interactiveMapInit',
  })(withTranslation()(withRouter(withEnv(Visualizer)))),
);
