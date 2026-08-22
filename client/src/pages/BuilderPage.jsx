import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppContext } from "../context/AppContex";
import Loading from "../components/Loading";
import Header from "../components/BuilderPage_Component/Header";
import Sidebar from "../components/BuilderPage_Component/Sidebar";

function BuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leftTab, setLeftTab] = useState("chat");
  const [publishing, setPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState(null);

  const {
    activeProject,
    loadingActiveProject,
    activeFile,
    showCode,
    setActiveFile,
    setShowCode,
    loadProject,
    logout,
    chatLoading,
    handleChat,
  } = useAppContext();

  useEffect(() => {
    if (!id) return;
    loadProject(id);
  }, [id]);

  useEffect(() => {
    if (!id || !activeProject) return;
    if (
      activeProject.status === "pending" ||
      activeProject.status === "generating"
    ) {
      const interval = setInterval(() => {
        loadProject(id, true);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [id, loadProject, activeProject]);

  const handleOpenPreview = () => {
    if (!id) return;
    window.open(`/preview/${id}`, "_blank");
  };

  const handlePublish = async () => {};

  const handleDownload = async () => {};
  if (loadingActiveProject || !activeProject) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden text-zinc-900 relative">
      <Header
        projectName={activeProject.name}
        version={activeProject.version}
        showCode={showCode}
        publishing={publishing}
        onToggleShowCode={() => setShowCode(!showCode)}
        onOpenPreview={handleOpenPreview}
        onPublish={handlePublish}
        onDownload={handleDownload}
        onBack={() => navigate("/")}
        onLogout={logout}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          leftTab={leftTab}
          setLeftTab={setLeftTab}
          messages={activeProject.messages}
          activeProject={activeProject}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          setShowCode={setShowCode}
          handleChat={handleChat}
          chatLoading={chatLoading}
        />
      </div>
    </div>
  );
}

export default BuilderPage;
