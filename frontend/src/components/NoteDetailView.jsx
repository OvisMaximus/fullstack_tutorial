import {useParams} from "react-router-dom";
import noteService from '../services/notes'
import {useEffect, useState} from "react";

const NoteDetailView = () => {
    const id = useParams().id
    const [note, setNote] = useState({content: 'not loaded yet', user: 'none', important: false})
    console.log('looking for note with id ' + id + '')
    useEffect(() => {
        const fetchNote = async () => {
            const foundNote = await noteService.get(id)
            console.log('got note ', foundNote)
            setNote(foundNote)
        }
        fetchNote()
    }, [id])

    console.log('note is', note)
    return (
        <div>
            <h2>{note.content}</h2>
            <div>added by {note.user.name}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}
export default NoteDetailView