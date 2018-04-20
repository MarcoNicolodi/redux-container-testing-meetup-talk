import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import nock from "nock";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import List from "./index";
import createStore from "../../lib/createStore";
import { initialState } from "./state/ducks";
import mockResponse from "../../../__mocks__/apiClient";

function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe("Documents listing feature integration tests", () => {
  const state = {
    document: { ...initialState }
  };
  const initialStore = createStore(state);
  const createWrapper = store =>
    mount(
      <Provider store={store}>
        <List />
      </Provider>
    );

  const axiosMock = new MockAdapter(axios);

  beforeEach(() => {});

  afterEach(() => {});

  describe("Table rendering", () => {
    axiosMock
      .onGet(
        "https://qualyteamdoc.azurewebsites.net/api/documents/?page=1&status=1"
      )
      .reply(200, mockResponse);
    const wrapper = createWrapper(initialStore);

    it("should render datatable if api call returns data", async () => {
      await flushAllPromises().then(() => {
        // due to https://github.com/airbnb/enzyme/issues/346
        wrapper.update();
        const datatable = wrapper.find("DataTable");
        expect(datatable).toHaveLength(1);
        // due to https://github.com/facebook/react/pull/11677
        // wrapper.unmount();
      });
    });

    it("should render documents inside datatable", async () => {
      await flushAllPromises().then(() => {
        const datatable = wrapper.find("DataTable");
        const firstRow = datatable.find("Row").at(0);
        const codeColIndex = 0;
        const titleColIndex = 1;
        expect(
          firstRow
            .find("td")
            .at(codeColIndex)
            .text()
        ).toEqual("code 1");

        expect(
          firstRow
            .find("td")
            .at(titleColIndex)
            .text()
        ).toEqual("title 1");
      });
    });
  });
});
