import { Game } from 'games/duck/store'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ACTION_TYPES as WHOAMI_ACTION_TYPES } from '../../whoami/duck/actions'
import { ACTION_TYPES, ActionType } from './actions'
import * as api from './api'

function* setDocument({ payload }: ActionType) {
  yield put<ActionType>({ type: ACTION_TYPES.SET_DOCUMENT.PENDING })
  const { res, err } = yield call(api.setDocument, payload!.game as Game)
  if (!!res) {
    yield put<ActionType>({ type: ACTION_TYPES.SET_DOCUMENT.FULFILLED, payload: { game: res } })
  } else {
    yield put<ActionType>({ type: ACTION_TYPES.SET_DOCUMENT.REJECTED, payload: { err } })
  }
}

function* updateDocument({ payload }: ActionType) {
  yield put<ActionType>({ type: ACTION_TYPES.UPDATE_DOCUMENT.PENDING })
  const { res, err } = yield call(api.updateDocument, payload?.update!)
  if (!!res) {
    yield put<ActionType>({
      type: ACTION_TYPES.UPDATE_DOCUMENT.FULFILLED,
      payload: { update: res },
    })
  } else {
    yield put<ActionType>({ type: ACTION_TYPES.UPDATE_DOCUMENT.REJECTED, payload: { err } })
  }
}

function* getByLogin() {
  yield put<ActionType>({ type: ACTION_TYPES.GET_FROM_LOGIN.PENDING })
  const { res, err } = yield call(api.getByLogin)
  if (!!res) {
    yield put<ActionType>({ type: ACTION_TYPES.GET_FROM_LOGIN.FULFILLED, payload: { games: res } })
  } else {
    yield put<ActionType>({ type: ACTION_TYPES.GET_FROM_LOGIN.REJECTED, payload: { err } })
  }
}

function* sagas() {
  yield all([
    takeLatest(ACTION_TYPES.SET_DOCUMENT.FETCH, setDocument),
    takeLatest(ACTION_TYPES.UPDATE_DOCUMENT.FETCH, updateDocument),
    takeLatest(WHOAMI_ACTION_TYPES.SIGN_IN.FULFILLED, getByLogin),
  ])
}

export default sagas

