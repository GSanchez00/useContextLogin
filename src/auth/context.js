import React, { createContext, useState } from "react";

const AuthContext = createContext(null);
const AuthProvider = ( {children} )  => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    isLoggingIn: false,
    token: null,
    user: null
  })
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext };
export default AuthProvider;
