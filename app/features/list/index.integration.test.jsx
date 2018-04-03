import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import nock from 'nock';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import List from './index';
import createStore from '../../lib/createStore';
import { initialState } from './state/ducks';
import mockResponse from '../../../__mocks__/apiClient';

function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('Documents listing feature integration tests', () => {
  const state = {
    document: { ...initialState },
  };
  const initialStore = createStore(state);
  const createWrapper = store => mount(<Provider store={store}><List /></Provider>);

  const axiosMock = new MockAdapter(axios);

  beforeEach(() => {

  });

  afterEach(() => {

  });

  it('should render', () => {
    const wrapper = createWrapper(initialStore);
    expect(wrapper).toHaveLength(1);
    // due to https://github.com/facebook/react/pull/11677
    wrapper.unmount();
  });

  fit('should render datatable if api call returns data', async () => {
    // nock('https://qualyteamdoc-dev-1.azurewebsites.net')
    //   .get('/api/documents/', 'page=1&status=1')
    //   .reply(200, { id: 1 });
    axiosMock.onGet('https://qualyteamdoc-dev-1.azurewebsites.net/api/documents/?page=1&status=1')
      .reply(
        200,
        mockResponse,
      );
    const wrapper = createWrapper(initialStore);
    await flushAllPromises().then(() => {
      // due to https://github.com/airbnb/enzyme/issues/346
      wrapper.update();
      const datatable = wrapper.find('DataTable');
      expect(datatable).toHaveLength(1);
      // wrapper.unmount();
    });
  });
});
