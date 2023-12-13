/*
https://youtu.be/VfReCe0nWOo?si=WbDoOiQGn60JpFmV
*/

//CSS
import "../../components/styles/Forms.css";

//React
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState(""),
    [passwd, setPasswd] = useState(""),
    { login, isLoading, err } = useLogin(),
    handleSubmit = async (event) => {
      event.preventDefault();
      await login(email, passwd);
    };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Log In</h1>
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
      {/* <button>Log In</button> */}
      <button disabled={isLoading}>Log In</button>
      {err && (
        <div className="err">
          <h2>{err}</h2>
        </div>
      )}
    </form>
  );
};

export default Login;
