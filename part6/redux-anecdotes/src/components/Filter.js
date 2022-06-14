import { connect } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'
import React from 'react'

const Filter = (props) => {

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.filterAnecdote(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { filterAnecdote }
)(Filter)