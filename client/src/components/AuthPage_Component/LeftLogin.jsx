function LoginLeft() {
  return (
    <div className="relative hidden min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat lg:flex lg:w-2/5 lg:shrink-0 flex-col justify-between p-8 sm:p-10 xl:p-12 select-none"
      style={{ backgroundImage: "url('/bg-img.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <img src="/logo.svg" alt="" className="size-9" />

        <span className="text-2xl xl:text-3xl font-semibold tracking-tight text-white">
          Builder AI
        </span>
      </div>

      {/* Content */}

      <div className="relative z-10 max-w-xl">
        <h2 className="mb-4 text-3xl xl:text-4xl font-semibold leading-tight tracking-tight text-white">
          Build your presence
          <br />
          <span className="text-zinc-300">on the web.</span>
        </h2>

        <p className="max-w-md text-sm xl:text-base leading-6 xl:leading-7 text-zinc-300">
          Describe what you need, preview instantly, and customize your site in
          real-time React with clean JSX, verified layouts, and instant code
          exports.
        </p>

        <p className="mt-8 xl:mt-12 text-xs text-zinc-400">
          © {new Date().getFullYear()} Builder AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginLeft;
