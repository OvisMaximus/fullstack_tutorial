import noteReducer, {createNote, toggleImportanceOf} from '../reducers/noteReducer.js'
import NewNote from "./NewNote.redux.jsx";
import NotesList from "./NotesList.jsx";
import filterReducer, {filterChange} from "../reducers/filterReducer.js";
import VisibilityFilter from "./VisibilityFilter.jsx";
import {configureStore} from "@reduxjs/toolkit";

export const initStore = () => {
    const store = configureStore({
        reducer: {
            notes: noteReducer,
            filter: filterReducer
        }
    })
    store.subscribe(() => console.log(store.getState()))
    store.dispatch(filterChange('IMPORTANT'))


    console.log('store state 0', store.getState())
    store.dispatch(createNote('the app state is in redux store'))
    console.log('store state 1', store.getState())
    let secondNoteAction = createNote('state changes are made with actions')
    store.dispatch(secondNoteAction)
    console.log('store state 2', store.getState())
    const id = store.getState().notes[1].id
    store.dispatch(toggleImportanceOf(id))
    console.log('store state 3', store.getState())

    return store
}

const Notes = () => {
    return (
        <div>
            <h1>Notes</h1>
            <NewNote/>
            <VisibilityFilter/>
            <NotesList/>
        </div>
    )
}

export default Notes