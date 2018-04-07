import React from 'react';
import { shallow } from 'enzyme';
import RowData from './index';

describe('<RowData />', () => {
  it('should render a single td element', () => {
    const wrapper = shallow(<RowData >1</RowData>);
    expect(wrapper.find('td')).toHaveLength(1);
  });

  it('should render children props inside td', () => {
    const wrapper = shallow(<RowData >row data</RowData>);
    expect(wrapper.find('td').text()).toEqual('row data');
  });
});
