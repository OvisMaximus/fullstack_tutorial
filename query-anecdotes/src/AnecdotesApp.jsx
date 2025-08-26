import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {createAnecdote, updateAnecdote, getAnecdotes} from "./requests.js";

const AnecdotesApp = () => {
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation(
        {
            mutationFn: createAnecdote,
            onSuccess: (newAnecdote) => {
                const anecdotes = queryClient.getQueryData(['anecdotes'])
                queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
            }
        }
    )

    const updateAnecdoteMutation = useMutation(
        {
            mutationFn: updateAnecdote,
            onSuccess: (modifiedAnecdote) => {
                const anecdotes = queryClient.getQueryData(['anecdotes'])
                const alteredAnecdotes = anecdotes.map(
                    anecdote => anecdote.id === modifiedAnecdote.id ? modifiedAnecdote : anecdote)
                queryClient.setQueryData(['anecdotes'], alteredAnecdotes)
            }
        }
    )

    const addAnecdote = async (content) => {
        newAnecdoteMutation.mutate({content, votes: 0})
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: false,
        refetchOnWindowFocus: false
    })

    console.log(JSON.parse(JSON.stringify(result)))

    if (result.isLoading) {
        return <div>loading data...</div>
    } else if (result.isError) {
        return <div>error: {result.error.message}</div>

    }

    const anecdotes = result.data

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification/>
            <AnecdoteForm addAnecdote={addAnecdote}/>

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdotesApp
