import ChatPanel from "./ChatPanel";
import FileExplore from "./FileExplore";
import { MessageSquareIcon, FolderTreeIcon } from "lucide-react";

const Sidebar = ({
  leftTab,
  setLeftTab,
  messages,
  activeProject,
  activeFile,
  setActiveFile,
  setShowCode,
  handleChat,
  chatLoading,
}) => {
  return (
    <div className="h-full shrink-0">
      <div className="h-full w-[320px] shrink-0 flex flex-col border-r border-zinc-200 bg-white">
        <div className="flex shrink-0 border-b border-zinc-100">
          <button
            onClick={() => setLeftTab("chat")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer ${leftTab === "chat" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}
          >
            <MessageSquareIcon size={13} />
            Chat
          </button>

          <button
            onClick={() => setLeftTab("files")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer ${leftTab === "files" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}
          >
            <FolderTreeIcon size={13} />
            Files
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {leftTab === "chat" ? (
            <div className="h-full min-h-0">
              <ChatPanel
                messages={messages}
                onSend={handleChat}
                loading={chatLoading}
              />
            </div>
          ) : (
            <div className="h-full min-h-0">
              <FileExplore
                files={activeProject?.files ?? {}}
                activeFile={activeFile}
                onFileSelect={(path) => {
                  setActiveFile(path);
                  setShowCode(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
