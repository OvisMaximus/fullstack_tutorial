import React from 'react'
import { createStore } from 'redux'
import noteReducer from '../reducers/noteReducer.js'

let store = null

const initStore = () => {
    store = createStore(noteReducer)

    console.log('store state 0', store.getState())
    store.dispatch({
        type: 'NEW_NOTE',
        payload: {
            content: 'the app state is in redux store',
            important: true,
            id: 1
        }
    })
    console.log('store state 1', store.getState())

    store.dispatch({
        type: 'NEW_NOTE',
        payload: {
            content: 'state changes are made with actions',
            important: false,
            id: 2
        }
    })
    console.log('store state 2', store.getState())
    store.dispatch({
        type: 'TOGGLE_IMPORTANCE',
        payload: {
            id: 2
        }
    })
    console.log('store state 3', store.getState())

    return store
}

const Notes = () => {

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {store.getState().map(note =>
                    <li key={note.id}>
                        {note.content} <strong>{note.important ? 'important' : ''}</strong>
                    </li>
                )}
            </ul>
        </div>
    )
}

export {
    Notes,
    initStore
}
