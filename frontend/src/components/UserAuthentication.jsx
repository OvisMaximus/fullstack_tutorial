import loginService from '../services/login.js'
import { useState } from 'react'
import Togglable from './Togglable.jsx'
import RenderOnlyWhen from './RenderOnlyWhen.jsx'
import { useNavigate } from 'react-router-dom'
import {Button, Form} from "react-bootstrap";

export const Login = ({ setUser, successMessage, errorMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            successMessage(`Welcome ${user.name}`)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
            navigate('/')
        } catch (_) {
            console.log('login failed', _)
            errorMessage('Wrong credentials')
        }
    }
// Form.Control: onChange={({ target }) => setPassword(target.value)}

    return (
        <div>
            <h2>login to application</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label column={false}>username:</Form.Label>
                    <Form.Control
                        data-testid="username"
                        type="text"
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label column={false}>password</Form.Label>
                    <Form.Control
                        data-testid="password"
                        type="password"
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </Form.Group>
                <Button variant='primary' type="submit">login</Button>
            </Form>
        </div>
    )
}

export const ActiveUser = ({ user, setUser, successMessage }) => {
    const logOff = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
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
const UserAuthentication = ({ setUser, successMessage, errorMessage }) => {
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
                        setUser={setUser}
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                    />
                </Togglable>
            </RenderOnlyWhen>
        </div>
    )
}

export default UserAuthentication