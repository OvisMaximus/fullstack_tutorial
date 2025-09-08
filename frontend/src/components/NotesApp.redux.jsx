import NewNote from './NewNote.redux.jsx'
import NotesList from './NotesList.jsx'
import VisibilityFilter from './VisibilityFilter.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeNotes } from '../reducers/noteReducer.js'

const Notes = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeNotes())
    }, [dispatch])
    return (
        <div>
            <h1>Notes</h1>
            <NewNote/>
            <VisibilityFilter/>
            <NotesList/>
        </div>
    )
}

export default Notes