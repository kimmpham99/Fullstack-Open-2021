import { createSlice } from "@reduxjs/toolkit";

const filterAtStart = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterAtStart,
  reducers: {
    filterAnecdote(state, action) {
      const content = action.payload
      return content
    }
  }
})

export const { filterAnecdote } = filterSlice.actions
export default filterSlice.reducer