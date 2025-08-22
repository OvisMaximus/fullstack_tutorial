import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService.js'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        updateAnecdote(state, action) {
            const updatedAnecdote = action.payload
            console.log('update ', updatedAnecdote)
            return state.map(anecdote =>
                anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions
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
export const voteForAnecdote = id => {
    return async dispatch => {
        const anecdote = await anecdotesService.get(id)
        anecdote.votes++
        await anecdotesService.update(anecdote)
        dispatch(updateAnecdote(anecdote))
    }
}
export default anecdoteSlice.reducer