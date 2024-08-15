import { createContext, useState } from "react";

// create a new context object (used to pass auth data down component tree) with initial value of empty object
const AuthContext = createContext({});

// AuthProvider is a higher-order component that takes in other components as children and provides them with authentication data through the AuthContext object
export const AuthProvider = ({ children }) => {
  // initial value is empty object
  const [auth, setAuth] = useState({});

  return (
    // value prop gives nested components access to auth and setAuth via AuthContext
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// note that authcontect and authprovider are two separate things
export default AuthContext;
