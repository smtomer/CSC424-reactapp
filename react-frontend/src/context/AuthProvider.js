import { createContext, useContext, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../utils/FakeAuth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
  
    const [token, setToken] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");

    // const [user, setUser] = useState(
        // {
        //   username: "",
        //   password: "",
        // }
    // );
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
  
    // const handleLogin = async () => {
    //   const token = await fakeAuth();
    //   setToken(token);
    //   navigate("/landing");
    // };
    const handleLogin = async (name, password) => {
        // setUser(user);
        setName(name);
        setPassword(password);
        if(name == "user" && password == "pass"){
            const token = await fakeAuth();
            setToken(token);
            navigate("/landing");
        }
        else{
           setErrorMessage("Incorrect username or password.");
        }
    };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    errorMessage,
  };


  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);