import Note from './components/Note.jsx'
import { useEffect, useRef, useState } from 'react'
import NoteForm from './components/NoteForm.jsx'
import Togglable from './components/Togglable.jsx'
import RenderOnlyWhen from './components/RenderOnlyWhen.jsx'
import localStorage from './components/helper/localStorageTools.js'
import { useResource } from './hooks/index.js'
import { Table } from 'react-bootstrap'
import { Paper, TableBody, TableContainer } from '@mui/material'
import { useDispatch } from 'react-redux'

const Notes = ({ errorMessage, successMessage }) => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const dispatch = useDispatch()
    const noteFormRef = useRef()
    const user = localStorage.extractUser() // script uses useEffect for initialization. why?
    const noteService = useResource(
        'http://localhost:3001/api/notes',
        user ? user.token : null,
    )

    const fetchNotes = async () => {
        console.log('fetch notes')
        const allNotes = await noteService.getAll()
        console.log('notes fetched: ', allNotes)
        setNotes(allNotes)
    }

    useEffect(() => {
        fetchNotes()
    }, [])
    console.log('render', notes.length, 'notes')

    const createNote = async (newNoteObject) => {
        noteFormRef.current.toggleVisibility()
        const newNote = await noteService.create(newNoteObject, user.token)
        setNotes(notes.concat(newNote))
        successMessage(`added note: ${newNote.content}`)(dispatch)
    }

    const toggleImportanceOf = (id) => async () => {
        console.log(`toggle ${id} requested`)
        const note = notes.find((n) => n.id === id)
        console.log('toggle note: ', note)
        const changedNote = { ...note, important: !note.important }

        try {
            const updatedNote = await noteService.update(
                changedNote,
                user.token,
            )
            setNotes(notes.map((note) => (note.id === id ? updatedNote : note)))
            successMessage(
                `note '${updatedNote.content}' ${updatedNote.important ? 'made' : 'removed'} important`,
            )(dispatch)
        } catch (error) {
            errorMessage(
                `error: '${note.content}' could not be modified: ${error.response.data.error}`,
            )(dispatch)
            console.log('error: ', error)
        }
    }
    const notesToRender = showAll
        ? notes
        : notes.filter((note) => note.important)
    return (
        <div>
            <h1>Notes</h1>
            <RenderOnlyWhen condition={user}>
                <Togglable
                    showButtonLabel="add note"
                    hideButtonLabel="cancel"
                    ref={noteFormRef}
                >
                    <NoteForm createNote={createNote} value={''} />
                </Togglable>
            </RenderOnlyWhen>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'only important' : 'all'}
            </button>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {notesToRender.map((note) =>
                            user ? (
                                <Note
                                    key={note.id}
                                    note={note}
                                    toggleImportance={toggleImportanceOf(
                                        note.id,
                                    )}
                                />
                            ) : (
                                <Note key={note.id} note={note} />
                            ),
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Notes
