import { call, put, takeLatest } from 'redux-saga/effects'
import { ticketActions } from './ticketSlice'
import { getApiDefault, postApiDefault } from './api'

// Lấy danh sách Dashboard
function* onGetList() {
  const url = '/CustomerTicket'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(ticketActions.getListTicketSuccess(response.data))
    } else {
      yield put(ticketActions.getListTicketFailed())
    }
  } catch (error) {
    yield put(ticketActions.getListTicketFailed('internet'))
  }
}

export default function* ticketSaga() {
  yield takeLatest(ticketActions.getListTicket, onGetList)
}
