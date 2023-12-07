/*
https://youtu.be/VfReCe0nWOo?si=WbDoOiQGn60JpFmV
*/

//CSS
import "../../component/styles/Forms";

//React
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState(""),
    [passwd, setPasswd] = useState(""),
    handleSubmit = async (event) => {
      event.preventDefault();
      console.log(`${email}\n${passwd}`);
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
        value={pass}
        required
      ></input>
      <button>Log In</button>
    </form>
  );
};
