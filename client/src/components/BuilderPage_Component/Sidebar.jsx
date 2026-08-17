import ChatPanel from "./ChatPanel";
import FileExplore from "./FileExplore";
import { MessageSquareIcon, FolderTreeIcon } from "lucide-react";

const Sidebar = ({
  leftTab,
  setLeftTab,
  messages,
  handleChat,
  chatLoading,
}) => {
  return (
    <div>
      <div className="w-[320px] shrink-0 flex flex-col border-r border-zinc-200 bg-white">
        {/* Sidebar tabs */}
        <div className="flex border-b border-zinc-100">
          {/* ChatBot part */}
          <button
            onClick={() => setLeftTab("chat")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer ${leftTab === "chat" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}
          >
            <MessageSquareIcon size={13} />
            Chat
          </button>

          {/* File Part */}
          <button
            onClick={() => setLeftTab("files")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer ${leftTab === "files" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}
          >
            <FolderTreeIcon size={13} />
            Files
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {leftTab === "chat" ? (
            <div>
              <ChatPanel
                messages={messages}
                onSend={handleChat}
                loading={chatLoading}
              />
            </div>
          ) : (
            <div>
              <FileExplore />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
