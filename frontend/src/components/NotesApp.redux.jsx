import {createStore} from 'redux'
import noteReducer, {createNote, toggleImportanceOf} from '../reducers/noteReducer.js'
import NewNote from "./NewNote.redux.jsx";
import NotesList from "./NotesList.jsx";


// TODO https://fullstackopen.com/en/part6/many_reducers#combined-reducers



export const initStore = () => {
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

const Notes = () => {
    const filterSelected = (value) => {
        console.log(value)
    }
    return (
        <div>
            <h1>Notes</h1>
            <NewNote/>
            <div>
                all          <input type="radio" name="filter"
                                    onChange={() => filterSelected('ALL')} />
                important    <input type="radio" name="filter"
                                    onChange={() => filterSelected('IMPORTANT')} />
                nonimportant <input type="radio" name="filter"
                                    onChange={() => filterSelected('NONIMPORTANT')} />
            </div>
            <NotesList/>
        </div>
    )
}

export default Notes