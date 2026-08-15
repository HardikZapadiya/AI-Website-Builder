import { createContext, useContext, useState, useEffect  } from "react";
import api from "../api/api";

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {
  //Auth states
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  //Auth Actions
  const checkSession = async () => {
    try {
      const { data } = await api.get("/api/auth/me");
      // setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };
  useEffect(() => {
    checkSession();
  }, []);
  return (
    <AppContext.Provider value={{ user, loadingUser }}>
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
