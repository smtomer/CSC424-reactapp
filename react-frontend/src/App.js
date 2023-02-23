import { Routes, Route, NavLink } from "react-router-dom";
import { Landing } from "./Landing";
import { Home } from "./Home";
// import React, { useState } from "react";
import { ProtectedRoute } from "./utils/ProtectedRoute";
// import { fakeAuth } from "./utils/FakeAuth";
// import { NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Register } from "./Register";
// import axios from 'axios';

import React from "react";


export const AuthContext = React.createContext(null);

const App = () => {
  

  return (
    <AuthProvider>
      <Navigation />
      <div className="center">
        <h1>React Router</h1>
      </div>
      <Routes>
        <Route index element={<Home />} />
        {/* <Route index element={<Home onLogin={handleLogin}/>} />
        <Route path="home" element={<Home onLogin={handleLogin} />} /> */}
        <Route path="landing" element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </AuthProvider>
  );
};

const Navigation = () => {
// const Navigation = ({token, onLogout}) => {
  const { value } = useAuth();
  // const { onLogout } = useAuth();
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/landing">Landing</NavLink>
      <NavLink to="/register">Register</NavLink>

      {/* {value.token && ( */}
      {value.token && (

        <button type="button" onClick={value.onLogout}>
        {/* <button type="button" onClick={onLogout}> */}

          Sign Out
      </button>
      )}
    </nav>
  );
}



export default App;
