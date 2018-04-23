import React from "react";
import { shallow } from "enzyme";
import { List } from "./index";
import { documents } from "../../../__mocks__/apiClient";
import mapper from "./lib/document-to-view-model";

describe("List Container unit tests", () => {
  const setPageMock = jest.fn();
  const setFilterMock = jest.fn();
  const fetchMock = jest.fn();

  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    isLoading: false,
    error: null,
    documents: documents.map(mapper),
    setPage: setPageMock,
    setFilter: setFilterMock,
    fetch: fetchMock
  };

  const wrapperFactory = props => shallow(<List {...props} />);

  afterEach(() => {
    setPageMock.mockClear();
    fetchMock.mockClear();
  });

  describe("Conditional Rendering", () => {
    it("should render datatable if documents props is passed", () => {
      const wrapper = wrapperFactory(defaultProps);
      expect(wrapper.find("DataTable")).toHaveLength(1);
    });

    it("should render loader component if isLoding props is true", () => {
      const wrapper = wrapperFactory({ ...defaultProps, isLoading: true });
      expect(wrapper.find("Loader")).toHaveLength(1);
    });

    it("should render alert component if error props is not null", () => {
      const wrapper = wrapperFactory({
        ...defaultProps,
        error: { level: "danger", message: "error" }
      });

      expect(wrapper.find("Alert")).toHaveLength(1);
    });

    it("should render no results component if documents props is an empty array", () => {
      const wrapper = wrapperFactory({ ...defaultProps, documents: [] });
      expect(wrapper.find("NoResults")).toHaveLength(1);
    });
  });

  describe("Class methods", () => {
    it("should fetch documents on mount", () => {
      wrapperFactory(defaultProps);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("should set page and list when changePage handler is called", () => {
      const wrapper = wrapperFactory(defaultProps);
      fetchMock.mockClear();
      wrapper.instance().handlePageChange(3);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(setPageMock).toHaveBeenCalledWith(3);
    });

    it("should set filter and list when filterSubmit handler is called", () => {
      const wrapper = wrapperFactory(defaultProps);
      fetchMock.mockClear();
      wrapper.instance().handleFilterSubmit("vendas");
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(setFilterMock).toHaveBeenCalledWith("vendas");
    });
  });

  describe("DataTable", () => {
    it("should pass documents props to Datatable data prop", () => {
      const wrapper = wrapperFactory(defaultProps);
      expect(wrapper.find("DataTable").props().data).toEqual(
        defaultProps.documents
      );
    });
  });

  describe("Pagination", () => {
    it("should pass paging information to Pagination", () => {
      const wrapper = wrapperFactory(defaultProps);
      expect(wrapper.find("Pagination").props().current).toEqual(
        defaultProps.currentPage
      );
      expect(wrapper.find("Pagination").props().total).toEqual(
        defaultProps.totalPages
      );
    });

    it("should handle pagination change event", () => {
      const wrapper = wrapperFactory(defaultProps);
      const handlerMock = jest.fn();
      wrapper.instance().handlePageChange = handlerMock;
      const expectedPage = 5;
      wrapper
        .find("Pagination")
        .props()
        .onChange(expectedPage);
      expect(handlerMock).toHaveBeenCalledWith(expectedPage);
    });
  });

  describe("Filter", () => {
    it("Should call handle filter submit event", () => {
      const wrapper = wrapperFactory(defaultProps);
      const handlerMock = jest.fn();
      wrapper.instance().handleFilterSubmit = handlerMock;
      const expectedFilter = "vendas";
      wrapper
        .find("Filter")
        .props()
        .onSubmit(expectedFilter);
      expect(handlerMock).toHaveBeenCalledWith(expectedFilter);
    });
  });
});
