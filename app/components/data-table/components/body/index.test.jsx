import React from 'react';
import { shallow } from 'enzyme';
import Body from './index';

describe('<Body />', () => {
    const onClick = jest.fn();

    const data = [{
        row: {
            b: 3,
            c: 'banana',
            d: 2,
        },
        onClick,
    },
    {
        row: {
            b: 1,
            c: 'apple',
            d: 1,
        },
        onClick,
    },
    {
        row: {
            b: 4,
            c: 'orange',
            d: 123,
        },
        onClick,
    }];

    it('should render a single tbody element', () => {
        const wrapper = shallow(<Body data={data} />);
        expect(wrapper.find('tbody')).toHaveLength(1);
    });

    it('should render as many Row as the number of objects passed as props', () => {
        const wrapper = shallow(<Body data={data} />);
        const numberOfRowElements = data.length;
        expect(wrapper.find('Row')).toHaveLength(numberOfRowElements);
    });

    it('should pass each object to Row element as prop', () => {
        const wrapper = shallow(<Body data={data} />);
        expect(wrapper.find('Row').at(0).props().data).toEqual(data[0]);
        expect(wrapper.find('Row').at(1).props().data).toEqual(data[1]);
        expect(wrapper.find('Row').at(2).props().data).toEqual(data[2]);
    });

    it('should pass click handler to Row as prop', () => {
        const wrapper = shallow(<Body data={data} />);
        expect(wrapper.find('Row').at(0).props().data.onClick).toEqual(onClick);
        expect(wrapper.find('Row').at(1).props().data.onClick).toEqual(onClick);
        expect(wrapper.find('Row').at(2).props().data.onClick).toEqual(onClick);
    });
});
