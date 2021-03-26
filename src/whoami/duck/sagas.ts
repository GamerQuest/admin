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
    yield put<ActionType>({ type: ACTION_TYPES.SIGN_OUT.FETCH })
  }
}

function* signIn({ payload }: ActionType) {
  const { email, password } = payload!
  yield put<ActionType>({ type: ACTION_TYPES.SIGN_IN.PENDING })
  const { res, err } = yield call(api.signIn, email!, password!)
  if (res) {
    yield put<ActionType>({ type: ACTION_TYPES.GET.FETCH, payload: { id: res } })
  } else {
    yield put<ActionType>({ type: ACTION_TYPES.SIGN_IN.REJECTED, payload: { err } })
  }
}

function* get({ payload }: ActionType) {
  const { id } = payload!
  yield put<ActionType>({ type: ACTION_TYPES.GET.PENDING })
  const { res, err } = yield call(api.get, id!)
  if (res) {
    yield put<ActionType>({ type: ACTION_TYPES.GET.FULFILLED, payload: { user: res } })
    yield put<ActionType>({ type: ACTION_TYPES.SIGN_IN.FULFILLED })
  } else {
    yield put<ActionType>({ type: ACTION_TYPES.GET.REJECTED, payload: { err } })
    yield put<ActionType>({ type: ACTION_TYPES.SIGN_OUT.FETCH })
  }
}

function* signOut() {
  yield put<ActionType>({ type: ACTION_TYPES.SIGN_OUT.PENDING })
  const { res } = yield call(api.signOut)
  if (res) {
    yield put<ActionType>({ type: ACTION_TYPES.SIGN_OUT.FULFILLED })
  } else {
    yield put<ActionType>({ type: ACTION_TYPES.SIGN_OUT.REJECTED })
  }
}

function* sagas() {
  yield all([
    takeLatest(ACTION_TYPES.SIGN_UP.FETCH, signUp),
    takeLatest(ACTION_TYPES.SET.FETCH, set),
    takeLatest(ACTION_TYPES.SIGN_IN.FETCH, signIn),
    takeLatest(ACTION_TYPES.GET.FETCH, get),
    takeLatest(ACTION_TYPES.SIGN_OUT.FETCH, signOut),
  ])
}

export default sagas
