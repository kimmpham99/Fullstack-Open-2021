import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import reducer from './reducers/anecdoteReducer'

//const store = createStore(reducer)
const store = configureStore({
  reducer: {
    anecdotes: reducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
