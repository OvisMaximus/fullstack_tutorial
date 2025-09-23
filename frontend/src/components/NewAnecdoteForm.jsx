import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
import {
    errorMessage,
    successMessage,
} from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.login)

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const newAnecdote = {
            content,
            important: false,
            votes: 0,
        }
        createAnecdote(newAnecdote, login, dispatch)
            .then((response) => {
                console.log('anecdote created: ', response)
                dispatch(successMessage(`you added ${content}`))
            })
            .catch((error) => {
                dispatch(
                    errorMessage(
                        `Creation of anecdote failed: ${error.response.data.error}`,
                    ),
                )
            })
    }

    return login && login.user ? (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" placeholder="enter an anecdote" />
                <button type="submit">add</button>
            </form>
        </div>
    ) : null
}

export default AnecdoteForm
