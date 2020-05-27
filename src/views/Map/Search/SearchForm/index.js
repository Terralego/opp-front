import { withTranslation } from 'react-i18next';

import { connectAppProvider } from '../../../../AppLayout/context';
import { SearchForm } from './SearchForm';

export default connectAppProvider({
  properties: 'searchFormProperties',
  setProperties: 'actions.setSearchFormProperties',
  getFirstPageFilteredViewpoints: 'actions.getFirstPageFilteredViewpoints',
  forceResultUnfolding: 'actions.forceResultUnfolding',
  resetSearchForm: 'actions.resetSearchForm',
  resetMapInitialState: 'actions.resetMapInitialState',
})(withTranslation()(SearchForm));
