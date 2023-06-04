import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = (type) => {

  const queryClient = useQueryClient()
  
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({type: "SHOW", message: 'Anecdote content too short, must have at least 5 characters.'})
      setTimeout(() => {
        dispatch({ type: "HIDE"})
      }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({ type: "SHOW", message: `Created new anecdote: '${content}'` })
      setTimeout(() => {
        dispatch({ type: "HIDE"})
      }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
