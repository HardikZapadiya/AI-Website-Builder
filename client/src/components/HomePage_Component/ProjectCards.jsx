import { Link } from "react-router-dom";
import { Trash2, Loader2 } from "lucide-react";

const ProjectCards = ({ project, handleDelete }) => {
  const isOngoing =
    project.status === "generating" ||
    project.status === "pending" ||
    project.status === "revising";

  return (
    <Link
      key={project._id}
      to={`/builder/${project._id}`}
      className="group relative flex flex-col justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-white line-clamp-2 pr-6">
          {project.name || project.prompt || "Untitled project"}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete(project._id);
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
            {project.status}
          </span>
        ) : (
          <span className="text-[11px] text-zinc-500">
            {project.createdAt
              ? new Date(project.createdAt).toLocaleDateString()
              : ""}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProjectCards;
