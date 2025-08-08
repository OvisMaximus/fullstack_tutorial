import AnecdoteForm from "./AnecdoteForm.jsx";
import AnecdoteList from "./AnecdoteList.jsx";
import AnecdotesFilter from "./AnecdotesFilter.jsx";
import Notification from "./Notification.redux.jsx";

const Anecdotes = () => {
    return (
        <div>
            <h1>Anecdotes</h1>
            <Notification/>
            <AnecdotesFilter />
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default Anecdotes