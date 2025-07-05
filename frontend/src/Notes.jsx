import {Note} from "./components/Note.jsx";
import {Notification} from "./components/Notification.jsx";
import {Footer} from "./components/Footer.jsx";
import {useState, useEffect} from "react";
import noteService from "./services/notes";

const Notes = ({errorMessage, successMessage}) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

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

    const addNote = (event) => {
        event.preventDefault()
        const newNoteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }

        noteService
            .create(newNoteObject)
            .then(newNote => {
                console.log('newNote: ', newNote)
                setNotes(notes.concat(newNote))
                setNewNote('')
                document.getElementById('newNoteInputField').value = ''
            }).catch(error => {
                errorMessage(`error: ${error.response.data.error}`)
        })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }
    const toggleImportanceOf = (id) => () => {
        console.log(`toggle ${id} requested`)
        const note = notes.find(n => n.id === id)
        console.log('toggle note: ', note)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(updatedNote => {
                console.log('updated note: ', updatedNote)
                setNotes(notes.map(note => note.id === id ? updatedNote : note))
            })
            .catch(error => {
                setErrorMessage(`error: The note '${note.content}' was already removed from server`)
                setTimeout(() => setErrorMessage(null), 5000)
                console.log('error: ', error)
                setNotes(notes.filter(n => n.id !== id))
            })
    }
    const notesToRender = showAll? notes : notes.filter(note => note.important)
    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>show {showAll? 'only important':'all'}</button>
            <ul>
                {notesToRender.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input id="newNoteInputField" defaultValue={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
            <Footer/>
        </div>
    )
}

export default Notes