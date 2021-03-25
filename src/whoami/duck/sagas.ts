import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ACTION_TYPES, ActionType } from './actions'
import * as api from './api'

function* signUp({ payload }: ActionType) {
  const { user, password } = payload!
  yield put<ActionType>({ type: ACTION_TYPES.SIGN_UP.PENDING })
  const { res, err } = yield call(api.signUp, user?.email!, password!)
  if (res) {
    yield put<ActionType>({ type: ACTION_TYPES.SET.FETCH, payload: { user: { ...user!, id: res! } } })
  } else {
    yield put<ActionType>({ type: ACTION_TYPES.SIGN_UP.REJECTED, payload: { err } })
  }
}

function* set({ payload }: ActionType) {
  const { user } = payload!
  yield put<ActionType>({ type: ACTION_TYPES.SET.PENDING })
  const { res, err } = yield call(api.set, user!)
  if (res) {
    yield put<ActionType>({ type: ACTION_TYPES.SET.FULFILLED, payload: { user } })
    yield put<ActionType>({ type: ACTION_TYPES.SIGN_UP.FULFILLED })
  } else {
    yield put<ActionType>({ type: ACTION_TYPES.SET.REJECTED, payload: { err } })
  }
}

function* sagas() {
  yield all([
    takeLatest(ACTION_TYPES.SIGN_UP.FETCH, signUp),
    takeLatest(ACTION_TYPES.SET.FETCH, set),
  ])
}

export default sagas
