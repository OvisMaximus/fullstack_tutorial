let timeoutId = 0
const displayMessage = (setMessage, setStatus, status, message) => {
    setMessage(message)
    setStatus(status)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => setMessage(null), 5000)
}

const initErrorMessage = (setMessage, setStatus) => (message) => {
    displayMessage(setMessage, setStatus, 'danger', message)
}

const initSuccessMessage = (setMessage, setStatus) => (message) => {
    displayMessage(setMessage, setStatus, 'success', message)
}

export { initErrorMessage, initSuccessMessage }