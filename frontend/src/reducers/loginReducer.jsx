import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login.js'

const loggedOff = {
    user: null,
    token: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState: loggedOff,
    reducers: {
        login(state, action) {
            const { name, username, token } = action.payload
            return {
                user: { name, username },
                token,
            }
        },
        logout() {
            return loggedOff
        },
    },
})

export const { login, logout } = loginSlice.actions

export const loginUser = async (username, password, dispatch) => {
    const user = await loginService.login({
        username,
        password,
    })
    dispatch(login(user))
    console.log('logged in ', user)
}

export default loginSlice.reducer
