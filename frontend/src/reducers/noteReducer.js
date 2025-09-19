import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = current(state).find((n) => n.id === id)
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
        removeNote(state, action) {
            return state.filter((n) => n.id !== action.payload)
        },
    },
})

export const { appendNote, toggleImportanceOf, setNotes, removeNote } =
    noteSlice.actions
export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}
export const createNote = async (note, login, dispatch) => {
    console.log('creating nEw note: ', note)
    const newNote = await noteService.create(note, login.token)
    dispatch(appendNote(newNote))
}

export const deleteNote = async (id, token, dispatch) => {
    await noteService.deleteId(id, token)
    dispatch(removeNote(id))
}

export const toggleImportance = async (note, token, dispatch) => {
    const changedNote = {
        ...note,
        important: !note.important,
    }
    await noteService.update(changedNote, token)
    dispatch(toggleImportanceOf(note.id))
}

export default noteSlice.reducer
