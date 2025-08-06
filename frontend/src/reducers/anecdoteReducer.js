
export const createAnecdote = (content, index) => {
    return {
        type: 'NEW_ANECDOTE',
        payload: {
            content,
            votes: 0,
            id: index
        }
    }
}

export const upvote = (index) => {
    return {
        type: 'VOTE_ANECDOTE',
        payload: { id: index }
    }
}

const anecdoteReducer = (state = [], action) => {
    console.log('action received', action)
    console.log('state before', state)
    let newState = state
    switch (action.type) {
        case 'NEW_ANECDOTE':
            newState = [... state, action.payload]
            break
        case 'VOTE_ANECDOTE': {
            const anecdote = state.find(a => a.id === action.payload.id)
            console.log('vote for ', anecdote)
            const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
            newState = state.map(a => a.id === action.payload.id ? newAnecdote : a)
            break
        }
        default:
    }

    console.log('state after', newState)
    return newState
}

export default anecdoteReducer