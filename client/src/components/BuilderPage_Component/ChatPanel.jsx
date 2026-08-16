import { useEffect, useRef } from "react";
import PromptInput from "../../components/PromptInput";
import { BotMessageSquareIcon, UserIcon, BotIcon } from "lucide-react";

function ChatPanel({ messages, onSend, loading }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 hide-scrollbar">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-400 text-sm text-center ">
              Ask AI to modify your website
            </p>
          </div>
        )}
        {messages.map((msg, idx) => {
          return (
            <div key={idx} className="flex gap-2.5 items-start">
              <div className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 bg-zinc-50">
                {msg.role === "user" ? (
                  <UserIcon size={14} className="text-zinc-700" />
                ) : (
                  <BotMessageSquareIcon size={14} className="text-zinc-700" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">
                  {msg.role === "user" ? "You" : "AI"}
                </p>
                <p className="text-[13px] text-zinc-700 leading-relaxed tracking-wider whitespace-pre-wrap break-words">
                  {msg.content.split("- `/").map((text, idx) => {
                    return (
                      <span key={idx} className="block mt-3">
                        <span className={idx === 0 ? "hidden" : ""}>- `/</span>
                        {text}{" "}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex gap-2.5 items-start">
            <div className="flex-1">
              <BotIcon size={13} className="text-zinc-900" />
            </div>
            <div className="dot-loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div>
        <PromptInput
          onSubmit={onSend}
          loading={loading}
          placeholder="Ask AI to modify..."
          autoFocus
        />
      </div>
    </div>
  );
}

export default ChatPanel;
