import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  dataTicket: [],
  urlImage: '',

  dataError: {}
}

const ticket = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    getListTicket(state) {
      state.isLoading = true
    },
    getListTicketFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListTicketSuccess(state, action) {
      state.isLoading = false
      state.dataTicket = action.payload || []
      state.isSuccess = true
    },

    getUrlImage(state) {
      state.isLoading = true
    },
    getUrlImageFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getUrlImageSuccess(state, action) {
      state.isLoading = false
      state.urlImage = action.payload || ''
      state.isSuccess = true
    },
    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    }
  }
})

export const ticketActions = ticket.actions

export const makeSelectTicket = state => state.ticket

export default ticket.reducer
