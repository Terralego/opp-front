import { withTranslation } from 'react-i18next';

import { Results } from './Results';
import { connectAppProvider } from '../../../AppLayout/context';

export default connectAppProvider({
  isResultUnfold: 'isResultUnfold',
  filteredViewpoints: 'filteredViewpoints.current',
  toggleResultFoldedState: 'actions.toggleResultFoldedState',
  getPaginatedFilteredViewpoints: 'actions.getPaginatedFilteredViewpoints',
  onMouseEnterResult: 'actions.onMouseEnterResult',
  onMouseLeaveResult: 'actions.onMouseLeaveResult',
})(withTranslation()(Results));
