import 'raf/polyfill';

import Enzyme from '@benlorantfy/enzyme';
import Adapter from '@benlorantfy/enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
