import AnecdoteForm from "./AnecdoteForm.redux.jsx";
import AnecdoteList from "./AnecdoteList.redux.jsx";
import AnecdotesFilter from "./AnecdotesFilter.redux.jsx";
import Notification from "./Notification.redux.jsx";
import { useEffect } from "react";
import { initializeAnecdotes } from "../reducers/anecdoteReducer.js";
import { useDispatch } from "react-redux";

const AnecdotesApp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("fetching anecdotes");
    dispatch(initializeAnecdotes());
  }, [dispatch]);
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdotesFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default AnecdotesApp;
