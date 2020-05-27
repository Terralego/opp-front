/* eslint-disable */

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

window.URL.createObjectURL = () => {};
Enzyme.configure({ adapter: new Adapter() });
