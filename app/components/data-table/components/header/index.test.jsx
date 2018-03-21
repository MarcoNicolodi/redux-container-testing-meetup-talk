import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('<Header />', () => {
  const headers = ['apple', 'orange', 'grape'];

  it('should render a single thead element', () => {
    const wrapper = shallow(<Header data={headers} />);
    expect(wrapper.find('thead')).toHaveLength(1);
  });

  it('should render  a single tr elemenet inside a thead element', () => {
    const wrapper = shallow(<Header data={headers} />);
    expect(wrapper.find('thead tr')).toHaveLength(1);
  });

  it('should render as many th elements as the number of data prop length', () => {
    const wrapper = shallow(<Header data={headers} />);
    expect(wrapper.find('th')).toHaveLength(headers.length);
  });

  it('should pass data props to th children as Formattedmessage', () => {
    const wrapper = shallow(<Header data={headers} />);
    expect(wrapper.find('th').at(0).props().children).toEqual(headers[0]);
    expect(wrapper.find('th').at(1).props().children).toEqual(headers[1]);
    expect(wrapper.find('th').at(2).props().children).toEqual(headers[2]);
  });
});
