import {useState} from 'react'
import {initErrorMessage, initSuccessMessage} from './components/helper/notification.js'
import Notification from './components/Notification.jsx'
import UserAuthentication from './components/UserAuthentication.jsx'
import AddressBook from './AddressBook.jsx'
import Notes from './Notes.jsx'
import Blogs from './components/Blogs.jsx'
import {Footer} from './components/Footer.jsx'

import {
    BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom'
import Home from "./components/Home.jsx";
import NoteDetailView from "./components/NoteDetailView.jsx";

const Application = () => {
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState('success')
    const errorMessage = initErrorMessage(setMessage, setStatus)
    const successMessage = initSuccessMessage(setMessage, setStatus)
    const padding = {
        padding: 5
    }
    return (
        <Router>
            <div>
                <Link style={padding} to="/">Home</Link>
                <Link style={padding} to="/notes">Notes</Link>
                <Link style={padding} to="/blogs">Blog Suggestions</Link>
                <Link style={padding} to="/addressbook">Address Book</Link>
                <Link style={padding} to="/users">Users</Link>
            </div>

            <Notification message={message} className={status}/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/notes/:id" element={<NoteDetailView/>}/>
                <Route path="/notes" element={<Notes successMessage={successMessage} errorMessage={errorMessage}/>}/>
                <Route path="/blogs" element={<Blogs successMessage={successMessage} errorMessage={errorMessage}/>}/>
                <Route path="/addressbook" element={<AddressBook successMessage={successMessage} errorMessage={errorMessage}/>}/>
                <Route path="/users" element={<UserAuthentication errorMessage={errorMessage} successMessage={successMessage}/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default Application