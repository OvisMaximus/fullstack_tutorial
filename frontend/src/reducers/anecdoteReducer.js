import { createSlice, current } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService.js'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
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

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
    return async dispatch => {
        const notes = await anecdotesService.getAll()
        dispatch(setAnecdotes(notes))
    }
}
export default anecdoteSlice.reducer