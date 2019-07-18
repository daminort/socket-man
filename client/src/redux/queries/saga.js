import uuid from 'uuid/v4';
import { all, takeLatest, put, select, call } from 'redux-saga/effects';

import { findIndex } from '../../helpers/lodash';
import { StorageUtils } from '../../helpers/utils/StorageUtils';

import actions from './actions';
import { selectQueries } from './selectors';

function* querySave({ payload }) {

  const { query } = payload;
  const { id } = query;
  if (!id) {
    query.id = uuid();
  }

  const queries = yield select(selectQueries);
  const result = [...queries];
  if (id) {
    const index = findIndex(queries, { id });
    result[index] = query;
  } else {
    result.push(query);
  }

  yield call(StorageUtils.storeQueries, result);
  yield put(actions.queriesSet(result));
  yield put(actions.modalDataSet({ queryID: query.id }));
}

function* queryRemove({ payload }) {

  const { id } = payload;

  const queries = yield select(selectQueries);
  const result = queries.filter(query => query.id !== id);

  yield call(StorageUtils.storeQueries, result);
  yield put(actions.queriesSet(result));
  yield put(actions.modalDataSet({ queryID: '' }));
}

function* queriesRestore() {
  const queries = yield call(StorageUtils.restoreQueries);
  yield put(actions.queriesSet(queries));
  yield put(actions.modalDataSet({ queryID: '' }));
}

export default function* appSaga() {
  yield all([
    takeLatest(actions.QUERY_SAVE, querySave),
    takeLatest(actions.QUERY_REMOVE, queryRemove),
    takeLatest(actions.QUERIES_RESTORE, queriesRestore),
  ]);
}
