import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    const anecdoteContent = anecdotes.find(a => a.id === anecdote.id).content
    dispatch(setNotification(`You voted '${anecdoteContent}'.`, 5))
  }

  const sortedAnecdotes = [...anecdotes]
  sortedAnecdotes.sort((a,b) => b.votes - a.votes)

  return (
    <div>
    <h2>Anecdotes</h2>
    {sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}

  </div>

  )
}

export default AnecdoteList