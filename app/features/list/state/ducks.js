import mapper from "../lib/document-to-view-model";

export const FETCH_ASYNC = "@@documents/FETCH_ASYNC";
export const SET_DATA = "@@documents/SET_DATA";
export const SET_IS_LISTING = "@@documents/SET_IS_LISTING";
export const SET_PAGE = "@@documents/SET_PAGE";
export const SET_ERROR = "@@documents/SET_ERROR";
export const SET_FILTER = "@@documents/SET_FILTER";

export const setIsListing = isListing => ({
  type: SET_IS_LISTING,
  payload: isListing
});

export const fetchAsync = () => ({ type: FETCH_ASYNC });

export const setData = payload => ({ type: SET_DATA, payload });

export const setPage = page => ({ type: SET_PAGE, payload: page });

export const setError = error => ({ type: SET_ERROR, payload: error });

export const setFilter = filter => ({ type: SET_FILTER, payload: filter });

export const initialState = {
  list: null,
  isListing: false,
  page: 1,
  filter: null,
  error: null
};

export const documentSelector = state =>
  state.document.list ? state.document.list.items.map(mapper) : null;

export const totalPagesSelector = state =>
  state.document.list && state.document.list.totalPages;

export const isLoadingSelector = state => state.document.isListing;

export const currentPageSelector = state => state.document.page;

export const errorSelector = state => state.document.error;

export const filterSelector = state => state.document.filter;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, list: action.payload };
    case SET_IS_LISTING:
      return { ...state, isListing: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};
