import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import nock from "nock";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import List from "./index";
import createStore from "../../lib/createStore";
import { initialState } from "./state/ducks";
import mockResponse, {
  page2documents,
  page3documents
} from "../../../__mocks__/apiClient";

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

  axiosMock
    .onGet(
      "https://qualyteamdoc.azurewebsites.net/api/documents/?page=1&status=1"
    )
    .reply(200, mockResponse);

  axiosMock
    .onGet(
      "https://qualyteamdoc.azurewebsites.net/api/documents/?page=2&status=1"
    )
    .reply(200, page2documents);

  axiosMock
    .onGet(
      "https://qualyteamdoc.azurewebsites.net/api/documents/?page=3&status=1"
    )
    .reply(200, page3documents);

  beforeEach(() => {});

  afterEach(() => {});

  describe("Table rendering", () => {
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
        const processColIndex = 2;
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

        expect(
          firstRow
            .find("td")
            .at(processColIndex)
            .text()
        ).toEqual("process name 1");
      });
    });

    it("should render page 2 documents when next button is clicked", async () => {
      await flushAllPromises().then(async () => {
        wrapper.update();
        const codeColIndex = 0;
        wrapper.find("#pagination-next-button").simulate("click");
        await flushAllPromises().then(() => {
          wrapper.update();
          wrapper.instance().forceUpdate();
          const datatable = wrapper.find("DataTable");
          const firstRow = datatable.find("Row").at(0);
          expect(
            firstRow
              .find("td")
              .at(codeColIndex)
              .text()
          ).toEqual("page 2 code");
          expect(wrapper.find("input").props().value).toEqual(2);
        });
      });
    });

    it("should jump to page if pagination input is filled", async () => {
      await flushAllPromises().then(async () => {
        wrapper.update();
        const input = wrapper.find("input");

        input.simulate("keyup", {
          target: {
            value: 3
          },
          keyCode: 13
        });

        wrapper.update();
        wrapper.instance().forceUpdate();
        expect(wrapper.find("input").props().value).toEqual(3);
      });
    });

    it("should render error component if api returns error", async () => {
      axiosMock.reset();
      axiosMock.onGet().reply(500);
      const wrapper2 = createWrapper(initialStore);
      await flushAllPromises().then(() => {
        wrapper2.update();
        expect(wrapper2.find("Alert")).toHaveLength(1);
        expect(wrapper2.find("Datatable")).toHaveLength(0);
      });
    });
  });
});
