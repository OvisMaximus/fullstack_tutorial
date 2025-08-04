import './index.css'
// import {StrictMode} from "react";
// import Application from "./Application";

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <StrictMode>
//        <Application/>
//     </StrictMode>
// )

import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
    console.log('action received', action)
    console.log('state before', state)
    if (action.type === 'NEW_NOTE') {
        const newState = state.concat([action.payload])
        console.log('state after', newState)
        return newState
    }

    return state
}

const store = createStore(noteReducer)
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
const App = () => {
    return(
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

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
