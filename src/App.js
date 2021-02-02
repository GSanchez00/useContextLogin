import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import AuthProvider from "./auth/context";
import Authentication from "./auth/authentication";
import ProtectedPage from "./protectedPage";

let logoutTimer;

export default function App() {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((token, expirationTime) => {
    setToken(token);
    const expiration = expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(expiration);
    localStorage.setItem("userData", JSON.stringify({
        token,
        expirationTime: expiration.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirationTime) > new Date()
    ) {
      login(storedData.token, new Date(storedData.expirationTime));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthProvider>
      <div className="center">
        <Authentication />
        <ProtectedPage />
      </div>
    </AuthProvider>
  );
}
