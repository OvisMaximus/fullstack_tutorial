import { createSlice, current } from '@reduxjs/toolkit'

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
export default anecdoteSlice.reducer