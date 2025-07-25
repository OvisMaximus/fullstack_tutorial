import {useState} from "react";

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('')

    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            important: true
        })

        setNewNote('')
        document.getElementById('newNoteInputField').value = ''
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                    id="newNoteInputField"
                    placeholder="write a new note here"
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default NoteForm