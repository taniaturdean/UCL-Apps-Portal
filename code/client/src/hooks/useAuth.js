import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// custom hook to save from having to import useContext and AuthContext everytime
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
