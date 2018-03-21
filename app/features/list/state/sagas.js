import { select, put, call, takeLatest } from 'redux-saga/effects';
import { setIsListing, setData, FETCH_ASYNC } from './ducks';
import fetchDocuments from '../api/apiClient';

function* list() {
  // const page = yield select(getFilters);
  // const pageSelected = yield select(selectors.getPageSelected);
  const pageSelected = 1;
  const params = { page: pageSelected };
  yield put(setIsListing(true));
  try {
    const apiResponse = yield call(fetchDocuments, params);
    yield put(setData(apiResponse));
  } catch (error) {
    yield put(setData(null));
  }
  yield put(setIsListing(false));
}

function* watchFetch() {
  yield takeLatest(FETCH_ASYNC, list);
}

export { watchFetch };
