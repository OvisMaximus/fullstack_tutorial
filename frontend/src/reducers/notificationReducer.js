import { createSlice } from '@reduxjs/toolkit'

const noMessage = {
    text: null,
    className: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        text: null,
        className: ''
    },
    reducers: {
        displayMessage (state, action) {
            return action.payload
        },
        clearMessage () {
            return noMessage
        }
    }
})

export const { displayMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer