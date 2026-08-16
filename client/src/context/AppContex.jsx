import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {
  const navigate = useNavigate();
  //Auth states
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  //Auth Actions
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await api.get("/api/auth/me");
        setUser(data.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    checkSession();
  }, []);

  //login function
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      setUser(data.user);
      toast.success("welocome back");
      navigate("/");
    } catch (err) {
      console.log("Login Failed", err);
    }
  };

  //register function
  const register = async (name, email, password, confirmPassword) => {
    try {
      const { data } = await api.post("/api/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      setUser(data.user);
      toast.success("Account created Successfully!");
      navigate("/");
    } catch (err) {
      console.log("Registration Failed", err);
    }
  };

  return (
    <AppContext.Provider value={{ user, loadingUser, login, register }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    console.log("Error Detected on useAppContext");
  }
  return context;
};
