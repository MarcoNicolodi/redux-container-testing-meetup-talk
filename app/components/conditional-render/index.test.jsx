import React from 'react';
import { shallow } from 'enzyme';
import ConditionalRender from './index';

describe('Conditional render', () => {
  const render = () => <h1> Render </h1>;
  const fallback = () => <span> Fallback </span>;
  const metCondition = true;
  const unmetCondition = false;
  const defaultProps = {
    render,
    fallback,
  };

  const createWrapper = props => shallow(<ConditionalRender {...props} />);

  it('should render element passed as true render prop if condition is met', () => {
    const wrapper = createWrapper({ ...defaultProps, condition: metCondition });
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should render fallback element if condition isnt met and fallback element is defined', () => {
    const wrapper = createWrapper({ ...defaultProps, condition: unmetCondition });
    expect(wrapper.find('span')).toHaveLength(1);
  });

  it('should not render any element if condition isnt met and fallback element is undefined', () => {
    const wrapper = createWrapper({ ...defaultProps, condition: unmetCondition, fallback: undefined });
    expect(wrapper.type()).toBeNull();
  });
});
