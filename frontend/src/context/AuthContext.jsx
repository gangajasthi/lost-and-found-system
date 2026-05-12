import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("lf_user")) || null
  );
  const [admin, setAdmin] = useState(
    () => JSON.parse(localStorage.getItem("lf_admin")) || null
  );

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("lf_user", JSON.stringify(userData));
  };

  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem("lf_admin", JSON.stringify(adminData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("lf_user");
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("lf_admin");
  };

  return (
    <AuthContext.Provider value={{ user, admin, loginUser, loginAdmin, logoutUser, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
