import loginService from '../services/login.js'
import {useState} from "react";
import {Button} from "./Button.jsx";

const Login = ({successMessage, errorMessage}) => {
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
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

const ActiveUser = ({user, successMessage}) => {
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
const UserAuthentication = ({successMessage, errorMessage}) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = loggedUserJSON ? JSON.parse(loggedUserJSON) : null

    return (
        <div>
            {user === null
                ? <Login
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                    />
                : <ActiveUser user={user} successMessage={successMessage}/>}
        </div>
    )
}

export default UserAuthentication