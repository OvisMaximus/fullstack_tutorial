import NewNote from "./NewNote.redux.jsx";
import NotesList from "./NotesList.jsx";
import VisibilityFilter from "./VisibilityFilter.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setNotes} from "../reducers/noteReducer.js";
import noteService from "../services/notes.js";

const Notes = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        noteService.getAll().then(notes => dispatch(setNotes(notes)))
    }, [])
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