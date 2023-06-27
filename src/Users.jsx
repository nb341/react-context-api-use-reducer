import React, { useEffect } from "react";
import { useAPI } from "./apiContext";

export default function Users() {
  const { state, dispatch } = useAPI();
  console.log(state);
  // useEffect(() => {
  //   console.log(state);
  // }, [state]);
  if (state.isLoading) {
    return <div>Loading...</div>;
  }
  if (state.errMess !== null) {
    return <div>Error {state.errMess}</div>;
  }
  if (
    state.errMess === null &&
    state.isLoading === false &&
    state.users !== null
  ) {
    return (
      <ul>
        {state.users.length > 0 &&
          state.users.map((u, i) => <li key={u.id + i}>{u.username}</li>)}
      </ul>
    );
  }
}
