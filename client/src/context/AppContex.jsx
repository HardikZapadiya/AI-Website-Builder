import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {
  const navigate = useNavigate();
  //Auth states
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  //States
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [loadingActiveProject, setLoadingActiveProject] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [generatingProject, setGeneratingProject] = useState(false);
  const [activeFile, setActiveFile] = useState("/App.js");
  const [showCode, setShowCode] = useState(false);

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

  //logout function

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      setProjects([]);
      setActiveProject(null);
      toast.success("Logged out Successfully!");
      navigate("/login");
    } catch (err) {
      console.log("Logout Failed", err);
    }
  };

  //project actions
  const loadProjects = async () => {
    if (!user) return;
    try {
      const { data } = await api.get("/api/projects");
      setProjects(data);
    } catch (err) {
      console.log("LoadProject Error", err);
    }
    setLoadingProjects(false);
  };

  const loadProject = async (id, silent = false) => {
    if (!user) return;
    if (!silent) setLoadingActiveProject(true);
    try {
      const { data } = await api.get(`/api/projects/${id}`);
      setActiveProject(data);
      const files = Object.keys(data.files);
      if (files.length > 0) {
        setActiveFile((prev) => {
          if (files.includes(prev)) return prev;
          if (files.includes("/App.js")) return "/App.js";
          return files[0];
        });
      }
    } catch (err) {
      console.log("loadProject Error", err);
    }
    setLoadingActiveProject(false);
  };

  useEffect(() => {
    if (!activeProject?._id || !user) return;

    const isOngoing =
      activeProject.status === "generating" ||
      activeProject.status === "pending" ||
      activeProject.status === "revising";

    if (isOngoing) {
      setChatLoading(true);
      const interval = setInterval(() => {
        loadProject(activeProject._id, true);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setChatLoading(false);
    }
  }, [activeProject?._id, activeProject?.status, loadProject, user]);

  const handleGenerate = useCallback(
    async (prompt) => {
      if (!user) return;

      setGeneratingProject(true);
      try {
        const { data } = await api.post("/api/projects", { prompt });
        toast.success("AI Agent is planning structure");
        navigate(`/builder/${data._id}`);
      } catch (err) {
        console.log("handleGenerate Error", err);
      }
      setGeneratingProject(false);
    },
    [navigate, user],
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!user) return;
      try {
        await api.delete(`/api/projects/${id}`);
        setProjects((prev) => prev.filter((p) => p._id !== id));
        toast.success("Project deleted succesfully");
      } catch (err) {
        console.log("handleDelete Error", err);
      }
    },
    [user],
  );

  return (
    <AppContext.Provider
      value={{
        user,
        loadingUser,
        login,
        register,
        projects,
        loadingProjects,
        activeProject,
        loadingActiveProject,
        chatLoading,
        generatingProject,
        activeFile,
        setActiveFile,
        showCode,
        setShowCode,
        loadProject,
        loadProjects,
        handleGenerate,
        handleDelete,
      }}
    >
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
