import {useState} from "react";
import {initErrorMessage, initSuccessMessage} from "./components/helper/notification.js";
import {Notification} from "./components/Notification.jsx";
import UserAuthentication from "./components/UserAuthentication.jsx";
import AddressBook from "./AddressBook.jsx";
import Notes from "./Notes.jsx";

const Application = () => {
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState('success')
    const [token, setToken] = useState(null)
    const errorMessage = initErrorMessage(setMessage, setStatus)
    const successMessage = initSuccessMessage(setMessage, setStatus)
    console.log('render errorMessage', errorMessage)

    return (
        <div>
            <Notification message = {message} className={status}/>
            <UserAuthentication errorMessage={errorMessage} successMessage={successMessage} setToken={setToken}/>
            <AddressBook errorMessage={errorMessage} successMessage={successMessage}/>
            <Notes successMessage={successMessage} errorMessage={errorMessage} token={token}/>
        </div>
    )
}

export default Application