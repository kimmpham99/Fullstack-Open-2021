import { toggleVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  //filter
  const anecdoteToShow = anecdotes.filter(anecdote => (anecdote.content.toLowerCase()).includes(filter.toLowerCase()))

  const vote = (id, content) => {
    dispatch(toggleVote(id))

    dispatch(showNotification(`you voted '${content}'`))

    setTimeout(() => {
      dispatch(showNotification(''))
    }, 5000);

    console.log('vote', id, content)
  }

  //sort anecdotes based on number of vote (can not sort directly the state array -> make a copy -> then sort)
  const arrayForSort = [...anecdoteToShow]
  arrayForSort.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {arrayForSort.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList