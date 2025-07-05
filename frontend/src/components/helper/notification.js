const displayMessage = (setMessage, setStatus, status, message) => {
    setMessage(message)
    setStatus(status)
    setTimeout(() => setMessage(null), 5000)
}

const initErrorMessage = (setMessage, setStatus) => (message) => {
    displayMessage(setMessage, setStatus, 'error', message)
}

const initSuccessMessage = (setMessage, setStatus) => (message) => {
    displayMessage(setMessage, setStatus, 'success', message)
}

export {initErrorMessage, initSuccessMessage}