const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    }
}

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
            console.log('toggle importance of ', note)
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