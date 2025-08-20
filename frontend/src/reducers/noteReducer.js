import { createSlice, current } from '@reduxjs/toolkit'

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        createNote(state, action) {
            state.push(action.payload)
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = current(state).find(n => n.id === id)
            console.log('note to change: ', noteToChange)
            const changedNote = { ...noteToChange, important: !noteToChange.important }
            return state.map(n => n.id === id ? changedNote : n)
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})

export const { createNote, toggleImportanceOf, setNotes } = noteSlice.actions
export default noteSlice.reducer