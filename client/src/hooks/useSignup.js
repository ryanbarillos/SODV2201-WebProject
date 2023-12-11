/*
    https://youtu.be/3yaHWZdH0FM?si=e8-s81vM3qKzk9FN
*/

import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [err, setErr] = useState(null),
    [isLoading, setIsLoading] = useState(null),
    { dispatch } = useAuthContext();

  const signup = async (email, passwd, namef, namel) => {
    setIsLoading(true);
    setErr(null);

    // Get POST response
    const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          passwd,
          namef,
          namel,
          type: "stdnt",
        }),
      }),
      json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
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
  };
  return { signup, isLoading, err };
};

export default useSignup;
