import { useEffect, useState } from 'react'
import anecdotesService from '../services/anecdotesService.js'
import localStorage from './helper/localStorageTools.js'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Votes = ({ value, upvoteAction }) => (
    <div>
        has {value} votes <Button onClick={upvoteAction} text="vote" />
    </div>
)
const AnecdoteListItem = ({ anecdote, upvoteAction }) => (
    <li key={anecdote.id}>
        <Link to={anecdote.id}>{anecdote.content}</Link>
        <Votes value={anecdote.likes} upvoteAction={upvoteAction} />
    </li>
)
const AnecdoteList = ({ successMessage }) => {
    const [anecdotes, setAnecdotes] = useState([])
    const [filterText] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        loadAnecdotes()
        return () => {}
    }, [])

    const loadAnecdotes = async () => {
        const anecdotes = await anecdotesService.getAll()
        setAnecdotes(anecdotes)
    }

    const upvoteAnecdote = async (anecdote) => {
        const updatedAnecdote = await anecdotesService.update(
            {
                ...anecdote,
                likes: anecdote.likes + 1,
            },
            localStorage.extractUser().token,
        )
        setAnecdotes(
            anecdotes.map((a) =>
                a.id !== updatedAnecdote.id ? a : updatedAnecdote,
            ),
        )
        successMessage(`you voted for ${anecdote.content}`)(dispatch)
    }

    console.log('anecdotes: ', anecdotes)
    console.log('filterText: ', filterText)

    const anecdotesToDisplay = anecdotes
        .filter((anecdote) => {
            const text = anecdote.content
            console.log('anecdote Text: ', text)
            return text.toLowerCase().includes(filterText.toLowerCase())
        })
        .sort((a, b) => b.votes - a.votes)

    return (
        <div>
            <Link to="/anecdotes/create">create new</Link>
            <ul>
                {anecdotesToDisplay.map((anecdote) => (
                    <AnecdoteListItem
                        key={anecdote.id}
                        anecdote={anecdote}
                        upvoteAction={() => {
                            upvoteAnecdote(anecdote)
                        }}
                    />
                ))}
            </ul>
        </div>
    )
}

export default AnecdoteList
