import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { Gallery } from './Gallery';

export default withRouter(withTranslation()(Gallery));
