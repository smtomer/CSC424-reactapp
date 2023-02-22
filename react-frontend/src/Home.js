import { useAuth } from "./context/AuthProvider";
import {React,  useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { value } = useAuth();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   return value.onLogin(username, password);
  // }
  const handleSubmit = async () => {
    value.username = username
    value.password = password
    value.onLogin();
};
  
  function handleClick() {
    navigate("/register");
  }

  return (
    <>
      <h2> Home (Public)</h2>

      {value.errorMessage}

      {/* <form onSubmit={handleSubmit}> */}
      <form>
        {/* <label> */}
          <p>Username</p>
          <input 
            type="text" 
            name="name"
            id="name"
            value={username} onChange={(e)=>setName(e.target.value)}/>
        {/* </label> */}
        {/* <label> */}
          <p>Password</p>
          <input 
          type="text"
          name="password"
          id="password"
          value={password} onChange={(e)=>setPassword(e.target.value)}
          />
        {/* </label> */}
        </form>
        <div>
        {/* <button type="button" onClick={value.onLogin(name, password)}> */}
        {/* <button type="submit"> */}
        <button type="submit" onClick={handleSubmit}>
          Sign In
        </button>
        <button type="button" onClick={handleClick}>
          Don't have an account?
        </button>
        </div>
      {/* </form> */}
    </>
  );
};
