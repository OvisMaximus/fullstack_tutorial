import './index.css'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import Application from './Application.jsx'
import { initStore } from './components/helper/notesStore.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = initStore()

root.render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <Application />
            </Router>
        </Provider>
    </StrictMode>,
)
