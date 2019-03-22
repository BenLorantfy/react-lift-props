/**
 * @description This file does some setup that needs to occur
 * before running any tests.
 * 
 * 1. Import raf polyfill since react 16 depeends on it
 * 2. Setup JSDOM so things like querySelectorAll work http://airbnb.io/enzyme/docs/guides/jsdom.html
 * 3. Setup the enzyme adapter
 */
import 'raf/polyfill';

const mountEl = document.createElement('div');
mountEl.setAttribute('id', 'app');
window.document.body.appendChild(mountEl);

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
