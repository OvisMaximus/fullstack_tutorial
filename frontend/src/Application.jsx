import { ActiveUser, Login } from './components/UserAuthentication.jsx'
import AdressBook from './components/AdressBook.jsx'
import Notes from './components/Notes.jsx'
import Blogs from './components/Blogs.jsx'
import { Footer } from './components/Footer.jsx'

import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import NoteDetailView from './components/NoteDetailView.jsx'
import Users from './components/Users.jsx'
import Anecdote from './components/Anecdote.jsx'
import AnecdoteForm from './components/NewAnecdoteForm.jsx'
import CountryInfo from './components/CountryInfo.jsx'
import { AppBar, Button, Container, Toolbar } from '@mui/material'
import Notification from './components/Notification.jsx'
import { successMessage, errorMessage } from './reducers/notificationReducer.js'
import { useSelector } from 'react-redux'
import Anecdotes from './components/Anecdotes.jsx'

const Application = () => {
    const login = useSelector((state) => state.login)
    const user = login ? login.user : null

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/blogs">
                        Blog Suggestions
                    </Button>
                    <Button color="inherit" component={Link} to="/notes">
                        Notes
                    </Button>
                    <Button color="inherit" component={Link} to="/addressbook">
                        Address Book
                    </Button>
                    <Button color="inherit" component={Link} to="/anecdotes">
                        Anecdotes
                    </Button>
                    <Button color="inherit" component={Link} to="/countries">
                        Country Info
                    </Button>
                    <Button color="inherit" component={Link} to="/users">
                        users
                    </Button>
                    {user ? (
                        <ActiveUser
                            user={user}
                            successMessage={successMessage}
                        />
                    ) : (
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Notification />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes/:id" element={<NoteDetailView />} />
                <Route
                    path="/notes"
                    element={
                        <Notes
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    path="/blogs"
                    element={
                        <Blogs
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    path="/anecdotes/:id"
                    element={
                        <Anecdote
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    path="/anecdotes/create"
                    element={
                        <AnecdoteForm
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route path="/anecdotes" element={<Anecdotes />} />
                <Route
                    path="/addressbook"
                    element={
                        <AdressBook
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route path="/countries" element={<CountryInfo />} />
                <Route
                    path="/users"
                    element={
                        user ? <Users /> : <Navigate replace to="/login" />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Login
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        />
                    }
                />
            </Routes>
            <Footer />
        </Container>
    )
}

export default Application
