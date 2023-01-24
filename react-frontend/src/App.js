import { Routes, Route, Link } from "react-router-dom";
import { Landing } from "./Landing";
import { Home } from "./Home";
import React, { useState } from "react";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { fakeAuth } from "./utils/FakeAuth";
import { NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";

export const AuthContext = React.createContext(null);

const App = () => {
  const [token, setToken] = React.useState(null);
  
  // const [user, setUser] = React.useState(null);
  const [user, setUser] = React.useState(
    {
      username: "",
      password: "",
    }
  );


  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token);
  };
  // const handleLogin = async () => {
  //   setUser(user);
  //   if(user.username == "user" && user.password == "pass"){
  //     const token = await fakeAuth();
  //     setToken(token);
  //   }
  // };


  const handleLogout = () => {
    setToken(null);
  };


  return (
    <AuthProvider>
    <Navigation />
   
    <h1>React Router</h1>

    <Routes>
      <Route index element={<Home />} />
      <Route
  path="landing"
  element={
    <ProtectedRoute>
      <Landing />
    </ProtectedRoute>
  }
  />
      <Route path="home" element={<Home />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  </AuthProvider>
);
};

const Navigation = () => {
  const { value } = useAuth();
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/landing">Landing</NavLink>
      {value.token && (
        <button type="button" onClick={value.onLogout}>
          Sign Out
      </button>
      )}
    </nav>
  );
}



export default App;
