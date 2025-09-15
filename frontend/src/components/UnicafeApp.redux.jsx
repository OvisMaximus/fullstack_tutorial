import { createStore } from "redux";
import { useEffect, useState } from "react";
import { reducer } from "../reducers/unicafeReducer.js";

let store = null;

const initStore = () => {
  store = createStore(reducer);
  return store;
};

const Unicafe = () => {
  const [currentState, setCurrentState] = useState(store.getState());

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCurrentState(store.getState());
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const incrementGood = () => {
    console.log("dispatching good");
    store.dispatch({
      type: "GOOD",
    });
  };

  const incrementOk = () => {
    console.log("dispatching ok");
    store.dispatch({
      type: "OK",
    });
  };

  const incrementBad = () => {
    console.log("dispatching bad");
    store.dispatch({
      type: "BAD",
    });
  };

  const resetVoting = () => {
    console.log("dispatching zero");
    store.dispatch({
      type: "ZERO",
    });
  };

  console.log("current state", currentState);

  return (
    <div>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementOk}>ok</button>
      <button onClick={incrementBad}>bad</button>
      <button onClick={resetVoting}>reset stats</button>
      <div>good {currentState.good}</div>
      <div>ok {currentState.ok}</div>
      <div>bad {currentState.bad}</div>
    </div>
  );
};

export { Unicafe, initStore };
