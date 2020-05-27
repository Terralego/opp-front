import { withRouter } from 'react-router-dom';

import { Viewpoint } from './Viewpoint';
import { connectAppProvider } from '../../AppLayout/context';

export default connectAppProvider({
  mapPosition: 'mapPosition',
  isNavBarVisible: 'isNavBarVisible',
  toggleNavBar: 'actions.toggleNavBar',
})(withRouter(Viewpoint));
