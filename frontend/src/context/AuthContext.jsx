import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    // Initialize state from localStorage
    const savedUser = localStorage.getItem("User");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage when authUser changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("User", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("User");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
