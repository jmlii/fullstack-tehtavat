import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

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

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdoteContent = anecdotes.find(a => a.id === id).content
    dispatch(setNotification(`You voted '${anecdoteContent}'.`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
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