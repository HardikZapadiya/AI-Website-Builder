import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const RightAuth = ({ mode }) => {
  const isLogin = mode === "login";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, register } = useAppContext();
  const navigate = useNavigate();

  const isLogin = mode == "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    // submit logic here
    setLoading(false);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-white relative">
      <div className="w-full max-w-sm">
        {/* Corner-bracket signature, mirrors the left panel */}
        <div className="relative pl-5 mb-10">
          <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-indigo-500/70 rounded-tl-sm" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
            {isLogin ? "Sign in" : "Create an account"}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {isLogin
              ? "Enter your credentials to access your website builder."
              : "Get started by entering your registration details."}
          </p>
        </div>

        {error && (
          <div role="alert" className="mb-6 p-3 border border-red-200 bg-red-50 text-red-700 text-xs rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="group">
              <label htmlFor="name" className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 group-focus-within:text-indigo-600 transition-colors">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-indigo-500 text-sm text-zinc-900 bg-transparent placeholder-zinc-300 transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="group">
            <label htmlFor="email" className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 group-focus-within:text-indigo-600 transition-colors">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-indigo-500 text-sm text-zinc-900 bg-transparent placeholder-zinc-300 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="group">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest group-focus-within:text-indigo-600 transition-colors">
                Password
              </label>
              {isLogin && (
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-zinc-400 hover:text-indigo-600 transition-colors"
                >
                  Forgot?
                </Link>
              )}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-2 pr-8 py-2 border-b border-zinc-200 focus:outline-none focus:border-indigo-500 text-sm text-zinc-900 bg-transparent placeholder-zinc-300 transition-colors"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="group">
              <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 group-focus-within:text-indigo-600 transition-colors">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-2 pr-8 py-2 border-b border-zinc-200 focus:outline-none focus:border-indigo-500 text-sm text-zinc-900 bg-transparent placeholder-zinc-300 transition-colors"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-600 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-fuchsia-700 text-white text-sm font-medium
                       hover:bg-indigo-600 active:bg-indigo-700
                       shadow-sm hover:shadow-[0_0_0_4px_rgba(109,94,240,0.15)]
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait…" : isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-8 text-sm text-zinc-500">
          {isLogin ? (
            <>
              New to Builder AI?{" "}
              <Link
                to="/register"
                className="text-zinc-900 font-medium hover:text-indigo-600 hover:underline"
              >
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-zinc-900 font-medium hover:text-indigo-600 hover:underline"
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default RightAuth;
