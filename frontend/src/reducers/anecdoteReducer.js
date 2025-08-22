import { createSlice, current } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService.js'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        voteAnecdote(state, action) {
            const anecdote = state.find(a => a.id === action.payload)
            console.log('vote for ', current(anecdote))
            anecdote.votes++
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}
export const createAnecdote = anecdote => {
    return async dispatch => {
        console.log('creating new anecdote: ', anecdote)
        const newAnecdote = await anecdotesService.create(anecdote)
        console.log('new anecdote: ', newAnecdote)
        dispatch(appendAnecdote(newAnecdote))
    }
}
export default anecdoteSlice.reducer