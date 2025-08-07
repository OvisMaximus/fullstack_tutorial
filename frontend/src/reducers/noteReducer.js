import { createSlice, current } from '@reduxjs/toolkit'

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        createNote(state, action) {
            const content = action.payload
            state.push({
                content,
                id: generateId(),
                important: false
            })
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = current(state).find(n => n.id === id)
            const changedNote = { ...noteToChange, important: !noteToChange.important }
            return state.map(n => n.id === id ? changedNote : n)
        }
    }
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer