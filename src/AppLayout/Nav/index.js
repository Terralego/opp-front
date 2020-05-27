import { connectSettingsProvider } from '../../components/SettingsProvider';
import { connectAppProvider } from '../context';

import Nav from './Nav';

export default connectSettingsProvider(({ env: { theme: { logo, logoUrl } } }) => ({
  logo,
  logoUrl,
}))(
  connectAppProvider({
    toggleSearchFoldedState: 'actions.toggleSearchFoldedState',
    resetMapInitialState: 'actions.resetMapInitialState',
  })(Nav),
);
