const noteReducer = (state = [], action) => {
    console.log('action received', action)
    console.log('state before', state)
    let newState = state
    switch (action.type) {
        case 'NEW_NOTE':
            newState = [... state, action.payload]
            break
        case 'TOGGLE_IMPORTANCE': {
            const note = state.find(n => n.id === action.payload.id)
            const newNote = { ...note, important: !note.important }
            newState = state.map(n => n.id === action.payload.id ? newNote : n)
            break
        }
        default:
    }

    console.log('state after', newState)
    return newState
}

export default noteReducer