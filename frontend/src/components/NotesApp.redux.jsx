import { createStore } from 'redux'
import {createNote, toggleImportanceOf} from '../reducers/noteReducer.js'
import noteReducer from '../reducers/noteReducer.js'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from "./NewNote.redux.jsx";

const initStore = () => {
    const store = createStore(noteReducer)

    console.log('store state 0', store.getState())
    store.dispatch(createNote('the app state is in redux store'))
    console.log('store state 1', store.getState())
    let secondNoteAction = createNote('state changes are made with actions')
    store.dispatch(secondNoteAction)
    console.log('store state 2', store.getState())
    store.dispatch(toggleImportanceOf(secondNoteAction.payload.id))
    console.log('store state 3', store.getState())

    return store
}

const Note = ({ note, handleClick }) => {
    return(
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state)


    return (
        <div>
            <h1>Notes</h1>
            <NewNote/>
            <ul>
                {notes.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        handleClick={() =>
                            dispatch(toggleImportanceOf(note.id))
                        }
                    />
                )}
            </ul>
        </div>
    )
}

export {
    Notes,
    initStore
}
