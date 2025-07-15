const Note = ({note, toggleImportance}) => {
    const label = note.important
        ? 'make not important' : 'make important'
    return (
        <li className='note'>
            {note.content}
            {toggleImportance? <button onClick={toggleImportance}>{label}</button> : ''}
        </li>
    )
}

module.exports = Note