import { useEffect } from "react";

import { useAppContext } from "../context/AppContex";
import PromptInput from "../components/HomePage_Component/PromptInput";
import ProjectGrid from "../components/HomePage_Component/ProjectGrid";
import Navbar from "../components/HomePage_Component/Navbar";
import ScrollingTags from "../components/HomePage_Component/ScrollingTags";

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
      className="relative  min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat flext flex-col select-none"
      style={{ backgroundImage: "url('/bg-img.png')" }}
    >
      <Navbar user={user} logout={logout} />

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

          <ScrollingTags
            handleGenerate={handleGenerate}
            generatingProject={generatingProject}
          />

          {!loadingProjects && projects.length > 0 && (
            <ProjectGrid projects={projects} handleDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
