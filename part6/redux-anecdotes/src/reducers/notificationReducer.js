import { createSlice } from "@reduxjs/toolkit"

let timeoutID

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      const content = action.payload
      return content
    },
    clearNotification() {
      return null
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, timeToDisplay) => {
  return async dispatch => {
    
    clearTimeout(timeoutID)

    setTimeout(() => {
      dispatch(showNotification(notification))
    }, timeToDisplay)

    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer