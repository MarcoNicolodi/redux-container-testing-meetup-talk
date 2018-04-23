import { select, put, call, takeLatest } from "redux-saga/effects";
import {
  setIsListing,
  currentPageSelector,
  filterSelector,
  setData,
  setError,
  FETCH_ASYNC
} from "./ducks";
import fetchDocuments from "../api/apiClient";

function* list() {
  const page = yield select(currentPageSelector);
  const filter = yield select(filterSelector);
  const params = { page, filter };
  yield put(setIsListing(true));
  try {
    const apiResponse = yield call(fetchDocuments, params);
    yield put(setData(apiResponse));
  } catch (error) {
    yield put(setData(null));
    yield put(
      setError({ level: "danger", message: "We had a problem in our servers" })
    );
  }
  yield put(setIsListing(false));
}

function* watchFetch() {
  yield takeLatest(FETCH_ASYNC, list);
}

export { watchFetch };
