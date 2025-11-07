import React, { useReducer } from "react";
import authReducer from "./reducers/authReducer";
import AuthContext from "./contexts/authContexts";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, authDispatch] = useReducer(authReducer, "");

  return (
    <AuthContext.Provider value={{ user, dispatch: authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
