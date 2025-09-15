import {useState} from 'react'
import {initErrorMessage, initSuccessMessage} from './components/helper/notification.js'
import {ActiveUser, Login} from './components/UserAuthentication.jsx'
import AddressBook from './AddressBook.jsx'
import Notes from './Notes.jsx'
import Blogs from './components/Blogs.jsx'
import {Footer} from './components/Footer.jsx'

import {
    Routes, Route, Link, Navigate
} from 'react-router-dom'
import Home from './components/Home.jsx'
import NoteDetailView from './components/NoteDetailView.jsx'
import Users from './components/Users.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import Anecdote from './components/Anecdote.jsx'
import AnecdoteForm from './components/AnecdoteForm.jsx'
import CountryInfo from "./components/CountryInfo.jsx";
import {Alert, AppBar, Button, Container, Toolbar} from "@mui/material";

// TODO https://fullstackopen.com/en/part7/exercises_extending_the_bloglist

const getLoggedInUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

const Application = () => {
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState('success')
    const [user, setUser] = useState(getLoggedInUser())

    const errorMessage = initErrorMessage(setMessage, setStatus)
    const successMessage = initSuccessMessage(setMessage, setStatus)

    return (
        <Container>
            {message && <Alert severity={status}>{message}</Alert>}
            <AppBar position='static' >
                <Toolbar>
                    <Button color='inherit' component={Link} to="/">
                        Home
                    </Button>
                    <Button color='inherit' component={Link} to="/blogs">
                        Blog Suggestions
                    </Button>
                    <Button color='inherit' component={Link} to="/notes">
                        Notes
                    </Button>
                    <Button color='inherit' component={Link} to="/addressbook">
                        Address Book
                    </Button>
                    <Button color='inherit' component={Link} to="/anecdotes">
                        Anecdotes
                    </Button>
                    <Button color='inherit' component={Link} to="/countries">
                        Country Info
                    </Button>
                    <Button color='inherit' component={Link} to="/users">
                        users
                    </Button>
                    {user
                        ?
                        <ActiveUser user={user} setUser={setUser} successMessage={successMessage}
                                    errorMessage={errorMessage}/>
                        : <Button color='inherit' component={Link} to="/login">Login</Button>
                    }
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/notes/:id" element={<NoteDetailView/>}/>
                <Route path="/notes" element={<Notes successMessage={successMessage} errorMessage={errorMessage}/>}/>
                <Route path="/blogs" element={<Blogs successMessage={successMessage} errorMessage={errorMessage}/>}/>
                <Route path="/anecdotes/:id"
                       element={<Anecdote successMessage={successMessage} errorMessage={errorMessage}/>}/>
                <Route path="/anecdotes"
                       element={<AnecdoteList successMessage={successMessage} errorMessage={errorMessage}/>}/>
                <Route path="/anecdotes/create"
                       element={<AnecdoteForm successMessage={successMessage} errorMessage={errorMessage}/>}/>
                <Route path="/addressbook"
                       element={<AddressBook successMessage={successMessage} errorMessage={errorMessage}/>}/>
                <Route path="/countries" element={<CountryInfo/>}/>
                <Route path="/users" element={user ? <Users/> : <Navigate replace to="/login"/>}/>
                <Route path="/login"
                       element={<Login setUser={setUser} successMessage={successMessage}
                                       errorMessage={errorMessage}/>}/>
            </Routes>
            <Footer/>
        </Container>
    )
}

export default Application