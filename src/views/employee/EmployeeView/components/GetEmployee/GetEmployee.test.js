import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GetEmployee from './GetEmployee';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
* Factory function to create a ShallowWrapper for the App component.
* @function setup
* @param {object} props - Component props specific to this setup.
* @returns {ShallowWrapper}
*/

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

const setup = (props = {}) => {
  return shallow(<GetEmployee {...props} />);
};

describe('Render Testing for Get Employee', () => {
  test('renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'get-employee-form');
    expect(appComponent.length).toBe(1);
  });
  test('renders Get Form inputs', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'get-employee-input');
    expect(appComponent.length).toBe(2);
  });
});

describe('Simulation Testing for Get Employee', () => {
  test('Simulate first form input change', () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, 'get-employee-input');
    inputComponent.first().simulate('change', {
      target: { value: 'First Employee input' }
    });
  });
  test('Simulate last form input change', () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, 'get-employee-input');
    inputComponent.last().simulate('change', {
      target: { value: 'First Employee input' }
    });
  });
});
