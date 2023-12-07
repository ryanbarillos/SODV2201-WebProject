/*
https://youtu.be/VfReCe0nWOo?si=WbDoOiQGn60JpFmV
*/

//CSS
import "../../component/styles/Forms";

//React
import { useState } from "react";

export const Signup = () => {
  const [email, setEmail] = useState(""),
    [passwd, setPasswd] = useState(""),
    [namef, setNameF] = useState(""),
    [namel, setNameL] = useState(""),
    handleSubmit = async (event) => {
      event.preventDefault();
      console.log(`${email}\n${passwd}`);
    };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
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
        value={pass}
        required
      ></input>
      <button>Sign Up</button>
    </form>
  );
};
