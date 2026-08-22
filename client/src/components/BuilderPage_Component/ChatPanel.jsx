import { useEffect, useRef } from "react";
import PromptInput from "../../components/PromptInput";
import {
  BotMessageSquareIcon,
  UserIcon,
  BotIcon,
  SparklesIcon,
} from "lucide-react";

function ChatPanel({ messages, onSend, loading }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full px-5 text-center animate-fade-in-up">
            <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-xl bg-zinc-100 text-zinc-700">
              <SparklesIcon size={18} />
            </div>
            <p className="text-sm font-medium text-zinc-800">
              What should we improve?
            </p>
            <p className="max-w-55 mt-1 text-xs leading-relaxed text-zinc-400">
              Describe a change and the AI agent will update your site.
            </p>
          </div>
        )}
        {messages.map((msg, idx) => {
          return (
            <div
              key={idx}
              className="flex gap-2.5 items-start animate-fade-in-up"
            >
              <div
                className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 ${msg.role === "user" ? "bg-zinc-900" : "bg-zinc-100"}`}
              >
                {msg.role === "user" ? (
                  <UserIcon size={14} className="text-white" />
                ) : (
                  <BotMessageSquareIcon size={14} className="text-zinc-700" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">
                  {msg.role === "user" ? "You" : "AI"}
                </p>
                <p className="text-[13px] text-zinc-700 leading-relaxed tracking-wider whitespace-pre-wrap wrap-break-word">
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
            <div className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 bg-zinc-900/5">
              <BotIcon size={13} className="text-zinc-900" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                AI
              </p>
              <div
                className="dot-loader"
                role="status"
                aria-label="AI is thinking"
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-zinc-200">
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
