import { useSelector } from 'react-redux'
import { clearMessage, displayMessage } from '../reducers/notificationReducer.js'
let pendingTimeout = -1

const displayMessageHelper = (dispatch, messageObject) => {
    const message = displayMessage(messageObject)
    console.log('dispatching ', message)
    dispatch(message)
    if (pendingTimeout !== -1) clearTimeout(pendingTimeout)
    pendingTimeout = setTimeout(() => dispatch(clearMessage()), 5000)
}

const errorMessage = (dispatch, message) => {
    displayMessageHelper(dispatch,{ className: 'error', text: message })
}

const successMessage = (dispatch, message) => {
    displayMessageHelper(dispatch, { className: 'success', text: message })
}

const Notification = () => {
    const message = useSelector(state => state.notification)
    if (message === null || message.text === null) return null

    return (
        <div className={`message ${message.className}`}>
            {message.text}
        </div>
    )
}

export default Notification
export { errorMessage, successMessage }
