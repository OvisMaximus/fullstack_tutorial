import './index.css'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import Application  from './components/Anecdotes.jsx'
import { initStore } from './components/helper/anecdotesStore.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = initStore()

root.render (
    <StrictMode>
        <Provider store={store}>
            <Application/>
        </Provider>
    </StrictMode>
)
