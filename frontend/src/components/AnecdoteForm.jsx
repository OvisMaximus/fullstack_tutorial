import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { successMessage } from './Notification.redux.jsx'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const newAnecdote = {
            content,
            important:false,
            votes: 0
        }
        dispatch(createAnecdote(newAnecdote))
        successMessage(dispatch, `you added ${content}`)
    }


    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" placeholder="enter an anecdote"/>
            <button type="submit">add</button>
        </form>
    )
}

export default AnecdoteForm