import Note from './components/Note.jsx'
import { useEffect, useRef, useState } from 'react'
import noteService from './services/notes'
import NoteForm from './components/NoteForm.jsx'
import Togglable from './components/Togglable.jsx'
import RenderOnlyWhen from './components/RenderOnlyWhen.jsx'
import localStorage from "./components/helper/localStorageTools.js";

const Notes = ({ errorMessage, successMessage }) => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const noteFormRef = useRef()
    const user = localStorage.extractUser() // script uses useEffect for initialization. why?

    const fetchNotes = () => {
        console.log('fetch notes')
        noteService
            .getAll()
            .then(notes => {
                console.log('notes fetched, total: ', notes.length)
                setNotes(notes)
            })
    }

    useEffect(fetchNotes, [])
    console.log('render', notes.length, 'notes')

    const createNote = async (newNoteObject) => {
        noteFormRef.current.toggleVisibility()
        const newNote = await noteService.create(newNoteObject, user.token)
        setNotes(notes.concat(newNote))
        successMessage(`added note: ${newNote.content}`)
    }

    const toggleImportanceOf = (id) => () => {
        console.log(`toggle ${id} requested`)
        const note = notes.find(n => n.id === id)
        console.log('toggle note: ', note)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote, user.token)
            .then(updatedNote => {
                console.log('updated note: ', updatedNote)
                setNotes(notes.map(note => note.id === id ? updatedNote : note))
                successMessage(`note '${updatedNote.content}' ${updatedNote.important ? 'made' : 'removed'} important`)
            })
            .catch(error => {
                errorMessage(`error: '${note.content}' could not be modified: ${error.response.data.error}`)
                console.log('error: ', error)
            })
    }
    const notesToRender = showAll ? notes : notes.filter(note => note.important)
    return (
        <div>
            <h1>Notes</h1>
            <RenderOnlyWhen condition={user}>
                <Togglable showButtonLabel="add note" hideButtonLabel="cancel" ref={noteFormRef}>
                    <NoteForm
                        createNote={createNote}
                        value={''}
                    />
                </Togglable>
            </RenderOnlyWhen>
            <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'only important' : 'all'}</button>
            <ul>
                {notesToRender.map(note => user
                    ? <Note key={note.id} note={note} toggleImportance={toggleImportanceOf(note.id)}/>
                    : <Note key={note.id} note={note}/>
                )}
            </ul>

        </div>
    )
}

export default Notes