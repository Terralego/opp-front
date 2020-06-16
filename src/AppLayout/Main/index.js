import { connectSettingsProvider } from '../../components/SettingsProvider';

import Main from './Main';

export default connectSettingsProvider('env')(Main);
