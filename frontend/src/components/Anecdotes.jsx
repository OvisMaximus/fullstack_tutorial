import AnecdoteForm from './NewAnecdoteForm.jsx'
import AnecdoteList from './AnecdoteList.jsx'
import AnecdotesFilter from './AnecdotesFilter.jsx'
import { useEffect } from 'react'
import { initializeAnecdotes } from '../reducers/anecdoteReducer.js'
import { useDispatch, useSelector } from 'react-redux'

const Anecdotes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('fetching anecdotes')
        initializeAnecdotes(dispatch).then((r) =>
            console.log('anecdotes initialized.'),
        )
    }, [])
    return (
        <div>
            <h1>Anecdotes</h1>
            <AnecdotesFilter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default Anecdotes
