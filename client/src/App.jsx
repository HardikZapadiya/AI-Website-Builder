import { Navigate, Route, Routes } from "react-router-dom";
import { GuestLayout, AuthLayout } from "./pages/Layout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import BuilderPage from "./pages/BuilderPage.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Login Route */}
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
        </Route>
        {/* Authenticate Route */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder/:id" element={<BuilderPage />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
        </Route>
        {/*catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
