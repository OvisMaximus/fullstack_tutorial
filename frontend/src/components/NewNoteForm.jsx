import { useDispatch, useSelector } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import {
    errorMessage,
    successMessage,
} from '../reducers/notificationReducer.js'

const NewNote = () => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.login)

    const addNote = async (event) => {
        event.preventDefault()
        const newNote = {
            content: event.target.note.value,
        }
        try {
            await createNote(newNote, login, dispatch)
            await successMessage(`note '${newNote.content}' created`)(dispatch)
        } catch (error) {
            console.log('error: ', error)
            await errorMessage(
                'error creating note: ' + error.response.data.error,
            )(dispatch)
        }
    }

    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    )
}

export default NewNote
