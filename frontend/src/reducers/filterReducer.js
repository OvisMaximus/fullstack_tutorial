import { createSlice } from '@reduxjs/toolkit'

export const FILTER_ALL = 'ALL'
export const FILTER_IMPORTANT = 'IMPORTANT'
export const FILTER_NOT_IMPORTANT = 'NOT_IMPORTANT'

const filterSlice = createSlice({
    name: 'notesFilter',
    initialState: FILTER_ALL,
    reducers: {
        setFilter: (state, action) => {
            console.log('setting filter to ', action.payload)
            switch (action.payload) {
                case FILTER_ALL:
                case FILTER_IMPORTANT:
                case FILTER_NOT_IMPORTANT:
                    return action.payload
                default:
                    return FILTER_ALL
            }
        },
    },
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
