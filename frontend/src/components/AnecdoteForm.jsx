import {useDispatch, useSelector} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer.js";
import {successMessage} from "./Notification.redux.jsx";

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createAnecdote({content: content, id: anecdotes.length}))
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