const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'make not important' : 'make important'
    return (
        <tr key={note.id}>
        <td>
            <a href={`/notes/${note.id}`}>{note.content}</a>
        </td><td>
            {note.user.name}
        </td><td>
            {toggleImportance? <button onClick={toggleImportance}>{label}</button> : ''}
        </td>
        </tr>
    )
}

export default Note
