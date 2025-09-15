import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = current(state).find((n) => n.id === id)
            console.log('note to change: ', noteToChange)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important,
            }
            return state.map((n) => (n.id === id ? changedNote : n))
        },
        setNotes(state, action) {
            return action.payload
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
    },
})

export const { appendNote, toggleImportanceOf, setNotes } = noteSlice.actions
export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}
export const createNote = (note) => {
    return async (dispatch) => {
        const newNote = await noteService.createNew(note)
        dispatch(appendNote(newNote))
    }
}
export default noteSlice.reducer
