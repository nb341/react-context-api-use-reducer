import { useContext, useEffect, createContext, useReducer } from "react";

import { reducer } from "./userReducer";
import * as ActionTypes from "./ActionTypes";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  //const [users, setUsers] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    users: [],
    errMess: null,
  });
  useEffect(() => {
    async function fetchData() {
      dispatch({ type: ActionTypes.USERS_LOADING });
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        const data = await response.json();
        // setUsers(data);
        dispatch({ type: ActionTypes.ADD_USERS, payload: data });
        //console.log("Download complete", response);
      } catch (error) {
        dispatch({ type: ActionTypes.USERS_FAILED, payload: error });
        console.error(`Download error: ${error.message}`);
      }
    }
    fetchData();
  }, []);
  return (
    <APIContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
