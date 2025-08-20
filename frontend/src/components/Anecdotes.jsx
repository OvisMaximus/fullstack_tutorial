import AnecdoteForm from './AnecdoteForm.jsx'
import AnecdoteList from './AnecdoteList.jsx'
import AnecdotesFilter from './AnecdotesFilter.jsx'
import Notification from './Notification.redux.jsx'
import { useEffect } from 'react'
import { setAnecdotes } from '../reducers/anecdoteReducer.js'
import anecdoteService from '../services/anecdotesService.js'
import { useDispatch } from 'react-redux'

const Anecdotes = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('fetching notes')
        anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, [])
    return (
        <div>
            <h1>Anecdotes</h1>
            <Notification/>
            <AnecdotesFilter />
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default Anecdotes