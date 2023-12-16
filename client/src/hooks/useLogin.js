/*
    https://youtu.be/3yaHWZdH0FM?si=e8-s81vM3qKzk9FN
*/

import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { Navigate, redirect } from "react-router";

const useLogin = () => {
  const [err, setErr] = useState(null),
    [isLoading, setIsLoading] = useState(null),
    { dispatch } = useAuthContext();

  const login = async (email, passwd) => {
    setIsLoading(true);
    setErr(null);

    // Get POST response
    const res = await fetch("/api/user/login", {
      // Consider converting to GET instead of POST
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, passwd }),
    }),
      json = await res.json();
    // console.log(json);

    if (!res.ok) {
      setErr(json.err);
    }
    if (res.ok) {
      /*
      Save user to local storage

      NOTE:
      According to online consensus, this method is insecure
      as a login session management, but for demonstration
      purposes this will suffice. Please look into other
      ways to store login sessions.
      */
      localStorage.setItem("user", JSON.stringify(json));
    }
    //Update auth context
    dispatch({ type: "LOGIN", payload: json });
    setIsLoading(false);
    // <Navigate to="/" />
  };
  return { login, isLoading, err };
};

export default useLogin;
