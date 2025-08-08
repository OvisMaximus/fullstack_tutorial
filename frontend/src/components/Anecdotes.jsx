import AnecdoteForm from "./AnecdoteForm.jsx";
import AnecdoteList from "./AnecdoteList.jsx";
import AnecdotesFilter from "./AnecdotesFilter.jsx";

const Anecdotes = () => {
    return (
        <div>
            <h1>Anecdotes</h1>
            <AnecdotesFilter />
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default Anecdotes