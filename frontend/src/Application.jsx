import {useState} from "react";
import {initErrorMessage, initSuccessMessage} from "./components/helper/notification.js";
import {Notification} from "./components/Notification.jsx";
import UserAuthentication from "./components/UserAuthentication.jsx";
import AddressBook from "./AddressBook.jsx";
import Notes from "./Notes.jsx";
import Blogs from "./components/Blogs.jsx";
import {Footer} from "./components/Footer.jsx";
import Togglable from "./components/Togglable.jsx";

const Application = () => {
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState('success')
    const errorMessage = initErrorMessage(setMessage, setStatus)
    const successMessage = initSuccessMessage(setMessage, setStatus)

    return (
        <div>
            <Notification message={message} className={status}/>
            <UserAuthentication errorMessage={errorMessage} successMessage={successMessage}/>
            <Togglable showButtonLabel="show Addressbook" hideButtonLabel="hide Addressbook">
                <AddressBook errorMessage={errorMessage} successMessage={successMessage}/>
            </Togglable>
            <Togglable showButtonLabel="show Notes" hideButtonLabel="hide Notes">
                <Notes successMessage={successMessage} errorMessage={errorMessage}/>
            </Togglable>
            <Togglable showButtonLabel="show Blog List" hideButtonLabel="hide Blog List">
                <Blogs successMessage={successMessage} errorMessage={errorMessage}/>
            </Togglable>
            <Footer/>
        </div>
    )
}

export default Application