import { connectAppProvider } from '../../AppLayout/context';
import Map from './Map';

export default connectAppProvider({
  isNavBarVisible: 'isNavBarVisible',
  toggleNavBar: 'actions.toggleNavBar',
})(Map);
