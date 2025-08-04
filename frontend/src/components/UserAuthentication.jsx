import loginService from '../services/login.js'
import { useState } from 'react'
import { Button } from './Button.jsx'
import Togglable from './Togglable.jsx'
import RenderOnlyWhen from './RenderOnlyWhen.jsx'

const Login = ({ successMessage, errorMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            successMessage(`Welcome ${user.name}`)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
        } catch (_) {
            console.log('login failed', _)
            errorMessage('Wrong credentials')
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        data-testid="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        data-testid="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

const ActiveUser = ({ user, successMessage }) => {
    const logOff = () => {
        window.localStorage.removeItem('loggedUser')
        successMessage('logged off')
    }
    return (
        <div>
            <p>
                {user.name} logged in <Button text='log off' onClick={logOff}/>
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
                <ActiveUser
                    user={user}
                    successMessage={successMessage}
                />
            </RenderOnlyWhen>
            <RenderOnlyWhen condition={!user}>
                <Togglable showButtonLabel='login'
                    hideButtonLabel='cancel' >
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