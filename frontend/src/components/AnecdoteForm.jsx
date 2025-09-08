import anecdotesService from '../services/anecdotesService.js'
import localStorage from './helper/localStorageTools.js'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = ({ successMessage, errorMessage }) => {
    const navigate = useNavigate()
    const content = useField('text', 'anecdote', 'enter an anecdote')
    const author = useField('text', 'author', 'enter an author')
    const url = useField('text', 'url', 'enter an url')

    const addAnecdote = async (event) => {
        event.preventDefault()
        const newAnecdote = {
            content: content.value,
            author: author.value,
            url: url.value
        }
        try {
            const token = localStorage.extractUser().token
            const anecdote = await anecdotesService.create(newAnecdote, token)
            console.log('new anecdote created', anecdote)
            successMessage(`you added ${content.value}`)
            navigate('/Anecdotes')
        } catch (error) {
            errorMessage(error.message)
        }
    }


    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input {...content} /><br/>
                <input {...author} /><br/>
                <input {...url} /><br/>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm