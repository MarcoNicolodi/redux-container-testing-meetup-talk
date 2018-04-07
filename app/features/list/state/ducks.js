export const FETCH_ASYNC = '@@documents/FETCH_ASYNC';
export const SET_DATA = '@@documents/SET_DATA';
export const SET_IS_LISTING = '@@documents/SET_IS_LISTING';
export const SET_PAGE = '@@documents/SET_PAGE';

export const setIsListing = isListing => ({
  type: SET_IS_LISTING, payload: isListing,
});

export const fetchAsync = () => ({ type: FETCH_ASYNC });

export const setData = payload => ({ type: SET_DATA, payload });

export const setPage = page => ({ type: SET_PAGE, payload: page });

export const initialState = {
  list: null,
  isListing: false,
  page: 1,
};

export const documentSelector = state => (state.document.list
  ? state.document.list.items.map(item => ({
    row: {
      Code: item.code,
      Title: item.title,
      Process: item.process.name,
      Category: item.category.name,
    },
  }))
  : null);

export const isLoadingSelector = state => state.document.isListing;

export const currentPageSelector = state => state.document.page;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, list: action.payload };
    case SET_IS_LISTING:
      return { ...state, isListing: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

