import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import List from "./index";
import createStore from "../../lib/createStore";
import { initialState } from "./state/ducks";
import mockResponse, {
  page2documents,
  page3documents,
  noResults,
  filteredResponse
} from "../../../__mocks__/apiClient";

function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe("Documents listing feature integration tests", () => {
  let initialStore;
  const state = {
    document: { ...initialState }
  };

  const wrapperFactory = store =>
    mount(
      <Provider store={store}>
        <List />
      </Provider>
    );

  const axiosMock = new MockAdapter(axios);

  beforeEach(() => {
    initialStore = createStore(state);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it("should render datatable if api call returns data", async () => {
    axiosMock
      .onGet(
        "https://qualyteamdoc.azurewebsites.net/api/documents/?page=1&status=1"
      )
      .reply(200, mockResponse);

    const wrapper = wrapperFactory(initialStore);
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
    axiosMock
      .onGet(
        "https://qualyteamdoc.azurewebsites.net/api/documents/?page=1&status=1"
      )
      .reply(200, mockResponse);
    const wrapper = wrapperFactory(initialStore);
    await flushAllPromises().then(() => {
      wrapper.update();
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
    // TODO 8
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

    // create wrapper

    // flush
    // update wrapper
    // click #pagination-next-button
    // flush again
    // update wrapper
    // find DataTable
    // find first(0) td of first(0) Row of DataTable
    // expect text to be "page 2 code"
    // assert .rc-pagination input is equal to 2

    const wrapper = wrapperFactory(initialStore);
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
        expect(wrapper.find(".rc-pagination input").props().value).toEqual(2);
      });
    });
  });

  it("should jump to page if pagination input is filled", async () => {
    axiosMock
      .onGet(
        "https://qualyteamdoc.azurewebsites.net/api/documents/?page=1&status=1"
      )
      .reply(200, mockResponse);

    axiosMock
      .onGet(
        "https://qualyteamdoc.azurewebsites.net/api/documents/?page=3&status=1"
      )
      .reply(200, page3documents);

    const wrapper = wrapperFactory(initialStore);
    await flushAllPromises().then(async () => {
      wrapper.update();
      const input = wrapper.find(".rc-pagination input");

      input.simulate("keyup", {
        target: {
          value: 3
        },
        keyCode: 13
      });
      await flushAllPromises().then(async () => {
        wrapper.update();
        wrapper.instance().forceUpdate();
        const datatable = wrapper.find("DataTable");
        const firstRow = datatable.find("Row").at(0);
        const codeColIndex = 0;
        expect(
          firstRow
            .find("td")
            .at(codeColIndex)
            .text()
        ).toEqual("page 3 code");

        expect(wrapper.find(".rc-pagination input").props().value).toEqual(3);
      });
    });
  });

  it("should render error component if api returns error", async () => {
    // TODO 9
    // mock a 500 reply at any axiosMock call
    const wrapper = wrapperFactory(initialStore);
    await flushAllPromises().then(() => {
      wrapper.update();
      // assert that Alert was rendered
      // assert that DataTable wasnt
      expect(wrapper.find("Alert")).toHaveLength(1);
      expect(wrapper.find("Datatable")).toHaveLength(0);
    });
  });

  it("should render no results components if api returns no results", async () => {
    axiosMock.onGet().reply(200, noResults);
    const wrapper = wrapperFactory(initialStore);
    await flushAllPromises().then(() => {
      wrapper.update();
      expect(wrapper.find("NoResults")).toHaveLength(1);
      expect(wrapper.find("DataTable")).toHaveLength(0);
    });
  });

  it("should filter results when filter is submited and api returns results", async () => {
    axiosMock
      .onGet(
        "https://qualyteamdoc.azurewebsites.net/api/documents/?page=1&status=1"
      )
      .reply(200, mockResponse);

    axiosMock
      .onGet(
        "https://qualyteamdoc.azurewebsites.net/api/documents/?page=1&status=1&document=vendas"
      )
      .reply(200, filteredResponse);
    const wrapper = wrapperFactory(initialStore);
    await flushAllPromises().then(async () => {
      wrapper.update();
      // "fill" with vendas simulate enter(13) keyUp event on input#filter-input
      wrapper.find("input#filter-input").simulate("keyUp", {
        target: {
          value: "vendas"
        },
        keyCode: 13
      });
      await flushAllPromises().then(() => {
        wrapper.update();
        // find second td of first Row of DataTable
        // assert that its text is "vendas 1"
        expect(
          wrapper
            .find("DataTable")
            .find("Row")
            .at(0)
            .find("td")
            .at(1)
            .text()
        ).toEqual("vendas 1");
        // find second td of second Row of DataTable
        // assert that its text is "vendas 2"
        expect(
          wrapper
            .find("DataTable")
            .find("Row")
            .at(1)
            .find("td")
            .at(1)
            .text()
        ).toEqual("vendas 2");
      });
    });
  });
});
