import React, { useContext } from "react";
import { AuthContext } from "./context";
import { fetchUser } from '../data/fakeApi'

export default function Authentication() {
  const {auth, setAuth} = useContext(AuthContext);

   const  loginHandler  = async () => {
    setAuth({
      ...auth,
      isLoggingIn: true
    })

    const userResponse = await fetchUser();

    setAuth({
      ...auth,
      user: userResponse.name,
      token: userResponse.token,
      isLoggedIn: true,
      isLoggingIn: false
    })
  };

  const logoutHandler = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
      isLoggedIn: false
    })
  };

  return (
    <>
      {!auth.isLoggedIn && (
        <button className="login" onClick={loginHandler}>
          Login
        </button>
      )}
      
      {auth.isLoggedIn && (
        <button className="logout" onClick={logoutHandler}>
          Logout
        </button>
      )}

      {auth.isLoggingIn && (
        <p>
          Login In...
        </p>
      )}
    </>
  );
}
