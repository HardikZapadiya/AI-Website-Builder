import ProjectCards from "./ProjectCards";

function ProjectGrid({ projects, handleDelete }) {
  return (
    <div className="w-full mt-10">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <p className="text-xs font-medium uppercase text-zinc-100 tracking-wider">
          All Projects
        </p>
        <span className="text-[11px] text-zinc-300 font-medium bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((p, i) => (
          <div
            key={p._id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
          >
            <ProjectCards project={p} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectGrid;
