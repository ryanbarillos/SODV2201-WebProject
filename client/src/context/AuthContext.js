/*
    REFERENCE(s)
    https://youtu.be/64RiVcXhxN0?si=lMJkvR-Ujbw3mar1
    https://youtu.be/6RhOzQciVwI?si=eujFn9GP1EY93FbK
    https://youtu.be/kK_Wqx3RnHk?si=DSuFwQixgzsemvlr
*/

import { createContext, useReducer, useEffect } from "react";

const ACT = {
  LIN: "LOGIN",
  LOUT: "LOGOUT",
},
  AuthContext = createContext(),
  AuthReducer = (state, action) => {
    switch (action.type) {
      case ACT.LIN:
        return { user: action.payload };
      case ACT.LOUT:
        return { user: null };
      default:
        return state;
    }
  },
  AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
      user: null,
    });

    useEffect(() => {
      /*
      Check if user credentials are in local storage
      To log in automatically
      */
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch({ type: ACT.LIN, payload: user });
      }
    }, []);
    // console.log("AuthContext State: ", state);
    return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContext, AuthReducer, AuthContextProvider };
