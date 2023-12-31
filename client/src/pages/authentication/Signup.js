/*
https://youtu.be/VfReCe0nWOo?si=WbDoOiQGn60JpFmV
*/

//CSS
import "../../components/styles/Forms.css";

//React & JS "modules"
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState(""),
    [passwd, setPasswd] = useState(""),
    [namef, setNameF] = useState(""),
    [namel, setNameL] = useState(""),
    { signup, isLoading, err } = useSignup(),
    handleSubmit = async (event) => {
      event.preventDefault();
      await signup(email, passwd, namef, namel);
      if (err) console.log(err);
    };

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="signup" onSubmit={handleSubmit}>
        <label>First Name (Required)</label>
        <input
          type="text"
          onChange={(event) => setNameF(event.target.value)}
          value={namef}
          required
        ></input>
        <label>Last Name (Required)</label>
        <input
          type="text"
          onChange={(event) => setNameL(event.target.value)}
          value={namel}
          required
        ></input>
        <label>Email (Required)</label>
        <input
          type="text"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        ></input>
        <label>Password (Required)</label>
        <input
          type="password"
          onChange={(event) => setPasswd(event.target.value)}
          value={passwd}
          required
        ></input>
        {/* <button>Sign Up</button> */}
        <button disabled={isLoading}>Sign Up</button>
        {err && (
          <div className="err">
            <h2>{err}</h2>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
