import PromptInput from "../components/PromptInput";
import { useAppContext } from "../context/AppContex";
import { homeTags } from "../assets/assets";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Loader2 } from "lucide-react";

const HomePage = () => {
  const {
    user,
    projects,
    loadingProjects,
    generatingProject,
    loadProjects,
    handleGenerate,
    handleDelete,
    logout,
  } = useAppContext();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div
      className="
        relative  min-h-screen overflow-hidden
        bg-cover bg-center bg-no-repeat
        flext flex-col 
        select-none
      "
      style={{ backgroundImage: "url('/bg-img.png')" }}
    >
      <nav className="sticky top-0 z-10 flex item-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="size-9" />
          <span className="text-xl font-semibold tracking-tight  text-white">
            BuilderAI <sup className="font-sans text-[10px] text-amber-200">[HD]</sup>
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

      {/* Hero section*/}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 mt-8 xl:mt-28">
        <div className="w-full max-w-2xl flex flex-col items-center">
          <div className="flex items-center gap-2 p-1.5 pr-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[13px] text-white/90">
            <span className="px-3 py-1 text-[11px] bg-red-700 rounded-full font-medium tracking-wider">
              Promo
            </span>
            <span>Create your first project First</span>
          </div>

          <h1 className="text-center text-4xl md:text-6xl font-medium mt-4 max-w-2xl text-white">
            Let's build your App together
          </h1>
          <p className="text-center text-sm md:text-base max-w-xl mt-4 text-white/65 leading-relaxed">
            Describe your idea and watch AI design, structure and lanch your
            website instantly. No coding required.
          </p>

          <div className="w-full mt-6">
            <PromptInput
              onSubmit={handleGenerate}
              loading={generatingProject}
              placeholder="Create a protfolio website"
              variant="glass"
              autoFocus
            />
          </div>
          {/* Scrolling Tags*/}

          <div className=" masked-marquee w-full mt-4 max-w-2xl overflow-hidden py-1">
            <div className="animate-marquee flex item-center w-max gap-3">
              {[...homeTags, ...homeTags].map((tag, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleGenerate(tag);
                  }}
                  disabled={generatingProject}
                  className="px-4 py-1.5 border rounded-full text-sm text-white bg-white/10 border-white/25 hover:bg-white/20 transition cursor-pointer shrink-0 font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* all projects */}
          {!loadingProjects && projects.length > 0 && (
            <div className="w-full mt-10">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <p className="text-xs font-medium uppercase text-zinc-100 tracking-wider">
                  All Projects
                </p>
                <span className="text-xs text-zinc-400 font-normal">
                  {projects.length}{" "}
                  {projects.length === 1 ? "project" : "projects"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((p) => {
                  const isOngoing =
                    p.status === "generating" ||
                    p.status === "pending" ||
                    p.status === "revising";

                  return (
                    <Link
                      key={p._id}
                      to={`/builder/${p._id}`}
                      className="group relative flex flex-col justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-white line-clamp-2 pr-6">
                          {p.name || p.prompt || "Untitled project"}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(p._id);
                          }}
                          className="opacity-0 group-hover:opacity-100 shrink-0 p-1.5 rounded-md text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                          aria-label="Delete project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {isOngoing ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-indigo-300">
                            <Loader2 size={12} className="animate-spin" />
                            {p.status}
                          </span>
                        ) : (
                          <span className="text-[11px] text-zinc-500">
                            {p.createdAt
                              ? new Date(p.createdAt).toLocaleDateString()
                              : ""}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
