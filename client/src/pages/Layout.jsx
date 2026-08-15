import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContex";
import Loading from "../context/Loading";
import  AuthPage  from "./AuthPage";

export const AuthLayout = () => {
  const { user, loadingUser } = useAppContext();

  if (loadingUser) return <Loading />;
  if (!user) return <AuthPage to="/login" replace />;

  return <Outlet />;
};

export const GuestLayout = () => {
  const { user, loadingUser } = useAppContext();

  if (loadingUser) return <Loading />;
  if (!user) return <AuthPage to="/" replace />;

  return <Outlet />;
};
