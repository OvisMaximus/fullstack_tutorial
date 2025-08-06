import {useDispatch, useSelector} from "react-redux";
import anecdoteReducer, {createAnecdote, upvote} from "../reducers/anecdoteReducer.js";
import {createStore} from "redux";
import AnecdoteForm from "./AnecdoteForm.jsx";

const Header = ({headerText}) => (<h1>{headerText}</h1>)
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Votes = ({value, upvoteAction}) => (
    <div>
        has {value} votes <Button onClick={upvoteAction} text='vote'/>
    </div>
)

export const initStore = () => {
    const store = createStore(anecdoteReducer)
    for (let i = 0; i < anecdoteTexts.length; i++) {
        store.dispatch(createAnecdote(anecdoteTexts[i], i))
    }
    return store
}
const anecdoteTexts = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
]

const Anecdote = ({anecdote, upvoteAction}) => (
    <div>
        {anecdote.content}
        <Votes value={anecdote.votes} upvoteAction={upvoteAction}/>
    </div>
)
const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    const anecdotesOrderedByVotes = anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <div>
            <Header headerText='Anecdotes'/>
            <AnecdoteForm/>
            <div>
                {anecdotesOrderedByVotes.map((anecdote) =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        upvoteAction={
                            ()=> dispatch(upvote(anecdote.id))
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default Anecdotes