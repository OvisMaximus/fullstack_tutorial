import { createSlice } from '@reduxjs/toolkit'

const anecdotesFilterSlice = createSlice({
    name: 'anecdotesFilter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            return action.payload
        },
    },
})

export const { filterChange } = anecdotesFilterSlice.actions
export default anecdotesFilterSlice.reducer
