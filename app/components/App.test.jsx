import React from 'react';
import App from './App';

test('Should render component', () => {
    const app = shallow(<App />)
    expect(app).toMatchSnapshot();
});