import React, { useContext } from "react";
import { AuthContext } from "./auth/context";

export default function ProtectedPage() {
  const { auth } = useContext(AuthContext);

  return auth.isLoggedIn && <h2>Bienvenido {auth.user}</h2>;
}
