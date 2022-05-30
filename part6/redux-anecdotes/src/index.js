import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

//const store = createStore(reducer)
const store = configureStore({
  reducer: {
    anecdotes: reducer,
    notification: notificationReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
