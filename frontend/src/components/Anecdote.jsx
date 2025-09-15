import { useParams } from "react-router-dom";
import anecdotesService from "../services/anecdotesService.js";
import { useEffect, useState } from "react";

const Anecdote = ({ errorMessage }) => {
  const [anecdote, setAnecdote] = useState({
    content: "undefined",
    author: "",
    url: "",
    likes: 0,
  });
  const id = useParams().id;
  const fetchAnecdote = async () => {
    const loadedObject = await anecdotesService.get(id);
    setAnecdote(loadedObject);
  };
  useEffect(() => {
    fetchAnecdote().catch((error) => {
      errorMessage(error.message);
    });
    return () => {};
  });

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <br />
      has {anecdote.likes} votes
      <br />
      <br />
      for more info see <a href={anecdote.url}>{anecdote.url}</a>
    </div>
  );
};

export default Anecdote;
