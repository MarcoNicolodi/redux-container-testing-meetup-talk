import React from 'react';
import { shallow } from 'enzyme';
import Row from './index';

describe('<Row />', () => {
    const data = {
        row: {
            b: 3,
            c: 'banana',
            d: 2,
        },
        onRowClick: undefined,
    };

    it('should render a single tr element', () => {
        const wrapper = shallow(<Row data={data} />);
        expect(wrapper.find('tr')).toHaveLength(1);
    });

    it('should render as many RowData as the number of data passed as props', () => {
        const wrapper = shallow(<Row data={data} />);
        expect(wrapper.find('RowData')).toHaveLength(Object.keys(data.row).length);
    });

    it('should pass data properties values to RowData children', () => {
        const wrapper = shallow(<Row data={data} />);
        expect(wrapper.find('RowData').at(0).props().children).toEqual(3);
        expect(wrapper.find('RowData').at(1).props().children).toEqual('banana');
        expect(wrapper.find('RowData').at(2).props().children).toEqual(2);
    });
});
