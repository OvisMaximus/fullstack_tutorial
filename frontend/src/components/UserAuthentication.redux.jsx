import { useState } from 'react'
import Togglable from './Togglable.jsx'
import RenderOnlyWhen from './RenderOnlyWhen.jsx'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { loginUser, logout } from '../reducers/loginReducer.jsx'
import { useDispatch, useStore } from 'react-redux'

export const Login = ({ successMessage, errorMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const store = useStore()

    const clearInputFields = () => {
        setUsername('')
        setPassword('')
    }
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            await loginUser(username, password, store.dispatch)
            const login = store.getState().login
            successMessage(`Welcome ${login.user.name}`)
            clearInputFields()
            navigate('/')
        } catch (_) {
            console.log('login failed', _)
            errorMessage('Wrong credentials')
        }
    }

    return (
        <div>
            <h2>login to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <TextField
                        label="username:"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="password:"
                        type="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        login
                    </Button>
                </div>
            </form>
        </div>
    )
}

export const ActiveUser = ({ user, successMessage }) => {
    const dispatch = useDispatch()
    const logOff = () => {
        dispatch(logout())
        successMessage('logged off')
    }
    return (
        <div>
            <p>
                {user.name} logged in <Button onClick={logOff}>log off</Button>
            </p>
        </div>
    )
}
const UserAuthentication = ({ successMessage, errorMessage }) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = loggedUserJSON ? JSON.parse(loggedUserJSON) : null

    return (
        <div>
            <RenderOnlyWhen condition={user}>
                <ActiveUser user={user} successMessage={successMessage} />
            </RenderOnlyWhen>
            <RenderOnlyWhen condition={!user}>
                <Togglable showButtonLabel="login" hideButtonLabel="cancel">
                    <Login
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                    />
                </Togglable>
            </RenderOnlyWhen>
        </div>
    )
}

export default UserAuthentication
