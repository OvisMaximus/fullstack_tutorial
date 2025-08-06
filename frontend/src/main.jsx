import './index.css'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { Unicafe, initStore } from './components/UnicafeApp.redux.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = initStore()

const renderApp = () => {
    root.render(
        <StrictMode>
            <Unicafe/>
        </StrictMode>
    )
}

renderApp()
store.subscribe(renderApp)
