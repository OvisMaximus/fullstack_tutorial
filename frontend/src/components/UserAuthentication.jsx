import loginService from '../services/login.js'
import {useState} from "react";

const Login = ({successMessage, errorMessage, setUser}) => {
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

const UserAuthentication = ({successMessage, errorMessage}) => {
    const [user, setUser] = useState(null)
    return (
        <div>
            <Login errorMessage={errorMessage} successMessage={successMessage} setUser={setUser}/>
        </div>
    )
}

export default UserAuthentication