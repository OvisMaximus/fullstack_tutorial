import './index.css'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import Application from './Application.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'
import blogReducer from './reducers/blogReducer.js'
import loginReducer from './reducers/loginReducer.jsx'
import noteReducer from './reducers/noteReducer.js'
import filterReducer from './reducers/filterReducer.js'

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        login: loginReducer,
        notes: noteReducer,
        notesFilter: filterReducer,
    },
})

root.render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <Application />
            </Router>
        </Provider>
    </StrictMode>,
)
