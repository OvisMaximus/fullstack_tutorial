import { useDispatch, useSelector } from 'react-redux'
import { deleteNote, toggleImportance } from '../reducers/noteReducer.js'
import { createSelector } from '@reduxjs/toolkit'
import { FILTER_ALL, FILTER_IMPORTANT } from '../reducers/filterReducer.js'
import {
    errorMessage,
    successMessage,
} from '../reducers/notificationReducer.js'

const Note = ({ note, handleClickImportance, handleClickDelete }) => {
    return (
        <tr key={note.id}>
            <td>{note.content}</td>
            <td onClick={handleClickImportance}>
                &nbsp;
                {note.important ? <b>important</b> : <i>regular</i>}
            </td>
            <td>
                &nbsp;
                {handleClickDelete ? (
                    <button onClick={handleClickDelete}>delete note</button>
                ) : (
                    ''
                )}
            </td>
        </tr>
    )
}

const selectNotes = (state) => state.notes
const selectFilter = (state) => state.notesFilter

const NotesList = () => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.login)
    const handleClickDelete = async (id, token) => {
        try {
            await deleteNote(id, token, dispatch)
            await successMessage('note deleted')(dispatch)
        } catch (error) {
            console.log('error: ', error)
            await errorMessage(
                'error deleting note: ' + error.response.data.error,
            )(dispatch)
        }
    }
    const selectVisibleNotes = createSelector(
        [selectNotes, selectFilter],
        (notes, filter) => {
            console.log('filter: ', filter)
            console.log('notes: ', notes)
            if (filter === FILTER_ALL) {
                return notes
            }
            return notes.filter(
                (note) => note.important === (filter === FILTER_IMPORTANT),
            )
        },
    )

    const selectedNotes = useSelector(selectVisibleNotes)

    console.log('selectedNotes: ', selectedNotes)

    return (
        <table>
            <tbody>
                {selectedNotes.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        handleClickImportance={() =>
                            toggleImportance(note, login.token, dispatch)
                        }
                        handleClickDelete={
                            login.user
                                ? () => handleClickDelete(note.id, login.token)
                                : null
                        }
                    />
                ))}
            </tbody>
        </table>
    )
}

export default NotesList
