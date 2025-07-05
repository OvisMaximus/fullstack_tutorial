import loginService from '../services/login.js'
import {useState} from "react";

const Login = ({successMessage, errorMessage, setUser, setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            successMessage(`Welcome ${user.name}`)
            setUser(user)
            setToken(user.token)
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

const ActiveUser = ({user}) => {
    return (
        <div>
            <p>
                {user.name} logged in
            </p>
        </div>
    )
}
const UserAuthentication = ({successMessage, errorMessage, setToken}) => {
    const [user, setUser] = useState(null)
    return (
        <div>
            {user === null
                ? <Login
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    setUser={setUser}
                    setToken={setToken}/>
                : <ActiveUser user={user}/>}

        </div>
    )
}

export default UserAuthentication