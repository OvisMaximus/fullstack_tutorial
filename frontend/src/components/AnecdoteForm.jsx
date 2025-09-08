import anecdotesService from '../services/anecdotesService.js'
import localStorage from './helper/localStorageTools.js'
import { useNavigate } from 'react-router-dom'

const AnecdoteForm = ({ successMessage, errorMessage }) => {
    const navigate = useNavigate()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const author = event.target.author.value
        const url = event.target.url.value
        const newAnecdote = {
            content,
            author,
            url
        }
        try {
            const token = localStorage.extractUser().token
            const anecdote = await anecdotesService.create(newAnecdote, token)
            console.log('new anecdote created', anecdote)
            successMessage(`you added ${content}`)
            navigate('/Anecdotes')
        } catch (error) {
            errorMessage(error.message)
        }
    }


    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" placeholder="enter an anecdote"/><br/>
                <input name="author" placeholder="enter an author"/><br/>
                <input name="url" placeholder="enter an url providing more info"/><br/>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm