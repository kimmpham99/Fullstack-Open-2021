import { toggleVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(toggleVote(id))
    console.log('vote', id)
  }

  //sort anecdotes based on number of vote (can not sort directly the state array -> make a copy -> then sort)
  const arrayForSort = [...anecdotes]
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList