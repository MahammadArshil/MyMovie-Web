// import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

const ContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);
    const login = (role, name) => {
        setRole(role);
        setName(name);
    }

    const logout = () =>{
      localStorage.clear();
      setRole(null);
      setName(null);
      navigate("/");
    }


  return (
    <authContext.Provider value={{role, name, login, logout}}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
export default ContextProvider;
