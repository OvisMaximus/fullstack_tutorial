import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { successMessage } from './Notification.redux.jsx'
import anecdoteService from '../services/anecdotesService.js'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        anecdoteService.create({content, important:false}).then(newAnecdote => {
            dispatch(createAnecdote(newAnecdote))
            successMessage(dispatch, `you added ${content}`)
        })
    }


    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" placeholder="enter an anecdote"/>
            <button type="submit">add</button>
        </form>
    )
}

export default AnecdoteForm