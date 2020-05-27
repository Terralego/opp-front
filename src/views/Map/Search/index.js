import { withTranslation } from 'react-i18next';

import { Search } from './Search';
import { connectAppProvider } from '../../../AppLayout/context';

export default connectAppProvider({
  map: 'map',
  isSearchUnfold: 'isSearchUnfold',
  toggleSearchFoldedState: 'actions.toggleSearchFoldedState',
})(withTranslation()(Search));
