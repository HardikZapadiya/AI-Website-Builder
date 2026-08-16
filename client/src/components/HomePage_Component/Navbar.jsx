const Navbar = ({ user, logout }) => {
  return (
    <nav className="sticky top-0 z-10 flex item-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="size-9" />
        <span className="text-xl font-semibold tracking-tight  text-white">
          BuilderAI{" "}
          <sup className="font-sans text-[10px] text-amber-200">[HD]</sup>
        </span>
      </div>
      <div className=" flex item-center gap-4 text-sm font-medium text-zinc-300">
        <span>{user?.name}</span>
        <button
          onClick={logout}
          className="py-1.5 px-3 border border-white/20 text-white hover:bg-white/10 text-xs rounded-md cursor-pointer bg-transparent"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
