import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer.js'
import { successMessage } from '../reducers/notificationReducer.js'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Votes = ({ value, upvoteAction }) => (
    <div>
        has {value} votes <Button onClick={upvoteAction} text="vote" />
    </div>
)
const Anecdote = ({ anecdote, upvoteAction }) => (
    <div>
        {anecdote.content}
        <Votes value={anecdote.likes} upvoteAction={upvoteAction} />
    </div>
)
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.anecdotes)
    const filterText = useSelector((state) => state.anecdotesFilter)
    console.log('anecdotes: ', anecdotes)
    console.log('filterText: ', filterText)
    const anecdotesToDisplay = anecdotes
        .filter((anecdote) => {
            const text = anecdote.content
            console.log('anecdote Text: ', text)
            return text.toLowerCase().includes(filterText.toLowerCase())
        })
        .sort((a, b) => b.votes - a.votes)

    return (
        <div>
            <h2>our current anecdotes</h2>
            {anecdotesToDisplay.map((anecdote) => (
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    upvoteAction={() => {
                        voteForAnecdote(anecdote.id)(dispatch)
                        dispatch(
                            successMessage(`you voted for ${anecdote.content}`),
                        )
                    }}
                />
            ))}
        </div>
    )
}

export default AnecdoteList
