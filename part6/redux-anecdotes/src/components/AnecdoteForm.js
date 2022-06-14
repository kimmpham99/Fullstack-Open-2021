import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import React from 'react'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    //update database
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)

    //update notification
    props.setNotification(`new anecdote '${content}'`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)