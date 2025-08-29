const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'make not important' : 'make important'
    return (
        <li className='note'>
            <a href={`/notes/${note.id}`}>{note.content}</a>
            {toggleImportance? <button onClick={toggleImportance}>{label}</button> : ''}
        </li>
    )
}

export default Note
