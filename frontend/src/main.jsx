import './index.css'
import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'

import Notes , {initStore} from './components/NotesApp.redux.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = initStore()

root.render (
    <StrictMode>
        <Provider store={store}>
            <Notes/>
        </Provider>
    </StrictMode>
)
