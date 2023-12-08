/*
    REFERENCE(s)
    https://youtu.be/64RiVcXhxN0?si=lMJkvR-Ujbw3mar1
    https://youtu.be/6RhOzQciVwI?si=eujFn9GP1EY93FbK
*/

import { createContext, useReducer } from "react";

const AuthContext = createContext(),
  AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.payload };
      case "LOGOUT":
        return { user: null };
      default:
        return state;
    }
  },
  AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
      user: null,
    });
    console.log("AuthContext State: ", state);
    return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContext, AuthReducer, AuthContextProvider };
