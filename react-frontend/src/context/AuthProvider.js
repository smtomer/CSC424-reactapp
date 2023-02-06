import { createContext, useContext, useState } from "react"; 
import { useNavigate } from "react-router-dom";
// import { fakeAuth } from "../utils/FakeAuth";
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    // const [errorMessage, setErrorMessage] = useState("");

    // const [user, setUser] = useState(
        // {
        //   username: "",
        //   password: "",
        // }
    // );
    // const [name, setName] = useState("");
    // const [password, setPassword] = useState("");
  
    // const handleLogin = async () => {
    //   const token = await fakeAuth();
    //   setToken(token);
    //   navigate("/landing");
    // };
    // const handleLogin = async (name, password) => {
    //     // setUser(user);
    //     setName(name);
    //     setPassword(password);
    //     if(name == "user" && password == "pass"){
    //         const token = await fakeAuth();
    //         setToken(token);
    //         navigate("/landing");
    //     }
    //     else{
    //        setErrorMessage("Incorrect username or password.");
    //     }
    // };


    // const handleLogin = async (user) => {
    //   try {
    //     const response = await axios.post('http://localhost:5000/Login', user);
    //     return response;
    //  }
    //  catch (error) {
    //     console.log(error);
    //     return false;
    //  }
    // };

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:5000/account/login', {value});
        console.log(response);
        if(response.status === 201){
          setToken(response.data.token);
          navigate('/landing');
        }
     }
     catch (error) {
      alert("Incorrect username or password.");
     }
    };

  const handleLogout = () => {
    setToken(null);
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