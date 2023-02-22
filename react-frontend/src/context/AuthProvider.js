import { createContext, useContext, useState } from "react"; 
import { useNavigate } from "react-router-dom";
// import { fakeAuth } from "../utils/FakeAuth";
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');


  // const handleRegister = async () => {
  //   try {
  //     const 
  //   }
  // }


    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:5000/account/login', {value});
        console.log(response);
        if(response.status === 201){
          setToken(response.data.token);
          
          //document.cookie = `token=${token}`;
          document.cookie = `token=${response.data.token}`;

          navigate('/landing');
        }
     }
     catch (error) {
      alert("Incorrect username or password.");
     }
    };

  const handleLogout = () => {
    setToken(null);
    document.cookie = `token=;max-age=300`
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    // errorMessage,
  };


  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);